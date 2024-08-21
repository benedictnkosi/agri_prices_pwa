import { useEffect, useState } from "react";
import { Alert, Spinner } from "flowbite-react";
import styles from "./CommodityPrices.module.scss";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { FilterModel } from "../../models/FilterModel";
import { TopProvinces } from "../TopProvinces/TopProvinces";
import { PeriodFilter } from "../PeriodFilter/PeriodFilter";
import { LineGraph } from "../LineGraph/LineGraph"; 
import { PriceModel } from "../../models/PriceModel";
import { DynamicFilter } from "../DynamicFilter/DynamicFilter";


export const CommodityPrices = () => {
  const { commodity } = useParams<{ commodity: string }>(); // Grab the type from the URL
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<string>("6");
  const [weight, setWeight] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [prices, setPrices] = useState<PriceModel[]>([]);
  const [filter, setFilter] = useState<FilterModel>({});
  const apiUrl = import.meta.env.VITE_API_URL;
  const pricesUrl = `${apiUrl}/public/prices`;
  
  
  const handleGradeClick = (value: string) => {
    if (value === grade) {
      setGrade("");
    }else{
      setGrade(value);
    }
   
  }

  const handleWeightClick = (value: string) => {
    if (value === weight) {
      setWeight("");
    }else{
      setWeight(value);
    }
    
  }

  useEffect(() => {
    const filter: FilterModel = {
      commodity: commodity || "",
      grade: grade,
      weight: weight,
      period: period
    }; 

    setFilter(filter);
  }, [commodity, grade, period, weight]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
    .get(pricesUrl, {
      params: {
        crop: commodity,
        grade: grade,
        weight: weight,
        period: period,
      },
    }).then((response) => {
      setLoading(false);
      console.log(response.data);
      setPrices(response.data);
    });
  }, [commodity, period, pricesUrl, weight, grade]);

  if (loading) {
    return <div className="text-center">
    <Spinner aria-label="Extra large spinner example" size="xl" />
  </div>;
  }

  if (error) {
    return (
      <Alert color="failure" onDismiss={() => alert('Alert dismissed!')}>
      {error}
    </Alert>
    );
  }
  
  return (
    <>
    <div className="container mt-4">
      <div className={styles["market-list"]}>
        <div className={styles["section-header"]}>{commodity}</div>
      </div>
      <TopProvinces filter={filter} />
      <PeriodFilter setPeriod={setPeriod} period={period}/>
      <DynamicFilter filter={filter} setValue={handleWeightClick} value={weight} field="weight" />
      <DynamicFilter filter={filter} setValue={handleGradeClick} value={grade} field="grade" />
      <LineGraph prices={prices}/>
    </div>
    </>
  );
};
