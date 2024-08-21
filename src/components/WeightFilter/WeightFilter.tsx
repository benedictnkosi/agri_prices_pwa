import { useEffect, useState } from "react";
import styles from "./WeightFilter.module.scss";
import axios from "axios";
import { FilterModel } from "../../models/FilterModel";
import { Button } from "flowbite-react";

interface WeightFilterProps {
  filter: FilterModel;
  setWeight: (weight: string) => void;
  weight: string;
}

interface WeightFilterData {
  weight: string;
  count: string;
}

export const WeightFilter : React.FC<WeightFilterProps> = ({
  filter,
  setWeight,
  weight
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const pricesUrl = `${apiUrl}/public/filters`;

  const [topWeights, setTopWeights] = useState<WeightFilterData[]>([]); // State to store the top provinces

  useEffect(() => {
    axios
    .get(pricesUrl, {
      params: {
        crop: filter.commodity,
        grade: filter.grade,
        weight: filter.weight,
        period: filter.period,
        field: "weight",
      },
    }).then((response) => {
      console.log(response.data);
      setTopWeights(response.data);
    });
  }, [filter.commodity, filter.grade, filter.period, filter.weight, pricesUrl]);


  return (
    <div className="container mt-4">
    <div className={styles["market-list"]}>
      <div className={styles["section-header"]}>Filter by weight (Size)</div>
      <div className={styles["card-container"]}>
        {topWeights.map((tempWeight: {weight: string ; count: string}) => (
          <Button  key={tempWeight.weight} onClick={() => setWeight(tempWeight.weight)}  gradientDuoTone="greenToBlue"
          {...(weight !== tempWeight.weight && { outline: true })}
          >
          {tempWeight.weight} kg
        </Button>
          
        ))}
      </div>
    </div>
  </div>
  );
};
