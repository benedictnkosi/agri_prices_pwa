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
import { WeightFilter } from "../WeightFilter/WeightFilter";


export const CommodityPrices = () => {
  const { commodity } = useParams<{ commodity: string }>(); // Grab the type from the URL
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<string>("6");
  const [weight, setWeight] = useState<string>("");

  const [prices, setPrices] = useState<PriceModel[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const pricesUrl = `${apiUrl}/public/prices`;
  
  const filter: FilterModel = {
    commodity: commodity || "",
    grade: "",
    weight: "",
    period: "3"
  }; 

  useEffect(() => {
    console.log(period);
  }, [period]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
    .get(pricesUrl, {
      params: {
        crop: commodity,
        grade: "",
        weight: weight,
        period: period,
      },
    }).then((response) => {
      setLoading(false);
      console.log(response.data);
      setPrices(response.data);
    });
  }, [commodity, period, pricesUrl, weight]);



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
      <WeightFilter filter={filter} setWeight={setWeight} weight={weight}/>
      <LineGraph prices={prices}/>
    </div>
    </>
  );
};
