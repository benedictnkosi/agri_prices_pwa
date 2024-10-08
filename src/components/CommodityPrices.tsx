import { useEffect, useState } from "react";
import { Alert, Button, Spinner } from "flowbite-react";
import styles from "./Pages.module.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FilterModel } from "../models/FilterModel";
import { SalesDirection } from "./SalesDirection/SalesDirection";
import { PeriodFilter } from "./PeriodFilter/PeriodFilter";
import { LineGraph } from "./LineGraph/LineGraph";
import { PriceModel } from "../models/PriceModel";
import { DynamicFilter } from "./DynamicFilter/DynamicFilter";
import NavBar from "./NavBar/NavBar";
import { PricesTable } from "./PricesTable/PricesTable";

export const CommodityPrices = () => {
  const { commodity } = useParams<{ commodity: string }>(); // Grab the type from the URL
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [dataFound, setDataFound] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<string>("6");
  const [weight, setWeight] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [variety, setVariety] = useState<string>("");
  const [prices, setPrices] = useState<PriceModel[]>([]);
  const [filter, setFilter] = useState<FilterModel>({} as FilterModel);
  const apiUrl = import.meta.env.VITE_API_URL;
  const pricesUrl = `${apiUrl}/public/prices`;

  const handleGradeClick = (value: string) => {
    if (value === grade) {
      setGrade("");
    } else {
      setGrade(value);
    }
  };

  const handleWeightClick = (value: string) => {
    if (value === weight) {
      setWeight("");
    } else {
      setWeight(value);
    }
  };

  const handleVarietyClick = (value: string) => {
    if (value === variety) {
      setVariety("");
    } else {
      setVariety(value);
    }
  };
 
  useEffect(() => {
    const filter: FilterModel = {
      commodity: commodity || "",
      grade: grade,
      weight: weight,
      period: period,
      variety: variety,
    };

    setFilter(filter);
  }, [commodity, variety, grade, period, weight]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (commodity && period) {
      axios
        .get(pricesUrl, {
          params: {
            crop: commodity,
            grade: grade,
            weight: weight,
            period: period,
            variety: variety,
            market: sessionStorage.getItem("market"),
          },
        })
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          setPrices(response.data);
          if (response.data.length === 0) {
            setDataFound(false);
          } else {
            setDataFound(true);
          }
        });
    }
  }, [commodity, period, pricesUrl, weight, grade, variety]);



  if (error) {
    return (
      <Alert color="failure" onDismiss={() => alert("Alert dismissed!")}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <NavBar showBackButton={true} />

      <div className="container mt-4 p-4">
        <div className={styles["market-list"]}>
          <div className={styles["card-container"]}>
            <div className={styles["main-header"]}>{commodity}</div>
            <SalesDirection filter={filter} prices={prices} />
          </div>
        </div>
       
        <PeriodFilter setPeriod={setPeriod} period={period} />
        <div>
          {loading ? (
            <div className="text-center">
              <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
          ) : (
            <>
            {!showFilters ? (
              <div className="text-center pt-5"> {/* Add text-center class */}
                <Button onClick={() => setShowFilters(true)} gradientDuoTone="greenToBlue" outline>More Filters +</Button>
              </div>
            ) : (
                <>
                <div className="text-center pt-5"> {/* Add text-center class */}
                <Button onClick={() => setShowFilters(false)} gradientDuoTone="greenToBlue" outline>Less Filters -</Button>
              </div>
                  <DynamicFilter
                    filter={filter}
                    setValue={handleWeightClick}
                    value={weight}
                    field="weight"
                  />
                  <DynamicFilter
                    filter={filter}
                    setValue={handleGradeClick}
                    value={grade}
                    field="grade"
                  />
                  <DynamicFilter
                    filter={filter}
                    setValue={handleVarietyClick}
                    value={variety}
                    field="commodity"
                  />
                </>
              )}
              {dataFound ? (
                <>
                  <LineGraph prices={prices} />
                  <PricesTable prices={prices} />
                  </>
              ) : (
                <div className="text-center pt-5"> {/* Add text-center class */}
                  <Alert color="failure">
                    No data found for the selected filters
                  </Alert>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
