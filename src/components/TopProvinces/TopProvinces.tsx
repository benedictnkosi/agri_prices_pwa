import { useEffect, useState } from "react";
import styles from "../Pages.module.scss";
import axios from "axios";
import { FilterModel } from "../../models/FilterModel";
import TopSalesCard from "../TopSalesCard/TopSalesCard";

interface TopProvincesProps {
  filter: FilterModel;
}

interface ProvinceData {
  province: string;
  totalSales: string;
}

export const TopProvinces : React.FC<TopProvincesProps> = ({
  filter
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const pricesUrl = `${apiUrl}/public/sales`;
  
  
  const [topProvinces, setTopProvinces] = useState<ProvinceData[]>([]); // State to store the top provinces

  useEffect(() => {
    axios
    .get(pricesUrl, {
      params: {
        crop: filter.commodity,
        grade: filter.grade,
        weight: filter.weight,
        period: filter.period,
      },
    }).then((response) => {

      console.log(response.data);
      const sortedProvinces = response.data.sort((a: { totalSales: number; }, b: { totalSales: number; }) => b.totalSales - a.totalSales);
      setTopProvinces(sortedProvinces.slice(0, 3)); // Get the top 3 provinces
    });
  }, [filter.commodity, filter.grade, filter.period, filter.weight, pricesUrl]);

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'm';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'k';
    }
    return amount.toString();
  };

  return (
    <div className="container mt-4">
    <div className={styles["market-list"]}>
      <div className={styles["section-header"]}>Regions with highest tonnage</div>
      <div className={styles["card-container"]}>
        {topProvinces.map((province: {province: string ; totalSales: string}) => (
          <TopSalesCard 
            key={province.province}
            amount={formatAmount(Number(province.totalSales))} 
            province={province.province} 
          />
        ))}
      </div>
    </div>
  </div>
  );
};
