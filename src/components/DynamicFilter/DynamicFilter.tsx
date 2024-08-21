import { useEffect, useState } from "react";
import styles from "./DynamicFilter.module.scss";
import axios from "axios";
import { FilterModel } from "../../models/FilterModel";
import { Button } from "flowbite-react";

interface DynamicFilterProps {
  filter: FilterModel;
  setValue: (value: string) => void;
  value: string;
  field: string;
}

interface FilterData {
  filterField: string;
  count: string;
}

export const DynamicFilter: React.FC<DynamicFilterProps> = ({
  filter,
  setValue,
  value,
  field,
}) => {
  const [showFilter, setshowFilter] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const pricesUrl = `${apiUrl}/public/filters`;

  const [topFilters, setTopFilters] = useState<FilterData[]>([]); // State to store the top provinces

  useEffect(() => {
    axios
      .get(pricesUrl, {
        params: {
          crop: filter.commodity,
          grade: filter.grade,
          weight: filter.weight,
          period: filter.period,
          field: field,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTopFilters(response.data);
        if (response.data.length > 1) {
          setshowFilter(true);
        }
      });
  }, [
    field,
    filter.commodity,
    filter.grade,
    filter.period,
    filter.weight,
    pricesUrl,
  ]);

  return (
    showFilter && (
      <div className="container mt-4">
        <div className={styles["market-list"]}>
          <div className={styles["section-header"]}>Filter by {field}</div>
          <div className={styles["card-container"]}>
            {topFilters.map(
              (tempFilter: { filterField: string; count: string }) => (
                <Button
                  key={tempFilter.filterField}
                  onClick={() => setValue(tempFilter.filterField)}
                  gradientDuoTone="greenToBlue"
                  {...(value !== tempFilter.filterField && { outline: true })}
                >
                  {tempFilter.filterField}
                  {field === "weight" ? " kg" : ""}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    )
  );
};
