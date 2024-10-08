import { useEffect, useState } from "react";
import styles from "../Pages.module.scss";
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
    if (filter.commodity && filter.period) {
      console.log("filter crop " + filter.commodity);
      axios
        .get(pricesUrl, {
          params: {
            crop: filter.commodity,
            grade: filter.grade,
            weight: filter.weight,
            period: filter.period,
            variety: filter.variety,
            field: field,
            market: sessionStorage.getItem("market"),
          },
        })
        .then((response) => {
          console.log(response.data);
          setTopFilters(response.data);
          if (response.data.length > 1) {
            setshowFilter(true);
          }
        });
    }
  }, [
    field,
    filter.commodity,
    filter.variety,
    filter.grade,
    filter.period,
    filter.weight,
    pricesUrl,
  ]);

  return (
    showFilter && (
      <div className="container mt-4">
        <div className={styles["market-list"]}>
          <div className={styles["section-header"]}>
            Filter by {field} (Sorted by popularity)
          </div>
          <div className={styles["card-container"]}>
            {topFilters.map(
              
              (tempFilter: { filterField: string; count: string }) =>
                tempFilter.filterField.length > 0 && (
                  <Button
                    key={tempFilter.filterField}
                    onClick={() => setValue(tempFilter.filterField)}
                    gradientDuoTone="greenToBlue"
                    {...(value !== tempFilter.filterField && { outline: true })}
                  >
                    {tempFilter.filterField === "0" && field === "weight"
                      ? 0.5
                      : tempFilter.filterField}
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
