import { useEffect, useState } from "react";
import styles from "../Pages.module.scss";
import axios from "axios";
import { FilterModel } from "../../models/FilterModel";
import TopSalesCard from "../TopSalesCard/TopSalesCard";
import { formatAmount } from "../Functions/common";

interface TopProvincesProps {
  filter: FilterModel;
}

interface ProvinceData {
  province: string;
  totalSales: string;
}

export const TopProvinces: React.FC<TopProvincesProps> = ({ filter }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const pricesUrl = `${apiUrl}/public/sales`;

  const [topProvinces, setTopProvinces] = useState<ProvinceData[]>([]); // State to store the top provinces

  useEffect(() => {
    if (filter.commodity && filter.period) {
      axios
        .get(pricesUrl, {
          params: {
            crop: filter.commodity,
            grade: filter.grade,
            weight: filter.weight,
            period: filter.period,
            market: sessionStorage.getItem("market"),
          },
        })
        .then((response) => {
          console.log(response.data);
          const sortedProvinces = response.data.sort(
            (a: { totalSales: number }, b: { totalSales: number }) =>
              b.totalSales - a.totalSales
          );
          setTopProvinces(sortedProvinces.slice(0, 3)); // Get the top 3 provinces
        });
    }
  }, [filter.commodity, filter.grade, filter.period, filter.weight, pricesUrl]);

  return (
    <div className="container mt-4">
      <div className={styles["market-list"]}>
        <div className={styles["section-header"]}>
          Regions with highest tonnage
        </div>
        <div className={styles["card-container"]}>
          {topProvinces.map(
            (province: { province: string; totalSales: string }) => {
              return (
                province.province.length > 1 && (
                  <TopSalesCard
                    key={province.province}
                    amount={formatAmount(Number(province.totalSales))}
                    province={province.province}
                  />
                )
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};
