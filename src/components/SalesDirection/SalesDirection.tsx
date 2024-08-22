import { useEffect, useState } from "react";
import axios from "axios";
import { FilterModel } from "../../models/FilterModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { formatAmount } from "../Functions/common";

interface SalesDirectionProps {
  prices: {
    sales_total: number;
  }[];
  filter: FilterModel;
}

interface salesData {
  difference: number;
  trend: string;
}

export const SalesDirection: React.FC<SalesDirectionProps> = ({
  filter,
  prices,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const pricesUrl = `${apiUrl}/public/previousperiodsales`;

  const [salesData, setSalesData] = useState<salesData>({
    difference: 0,
    trend: "",
  }); // State to store the top provinces

  useEffect(() => {

    if (filter.commodity && filter.period) {
    axios
      .get(pricesUrl, {
        params: {
          crop: filter.commodity,
          period: filter.period,
        },
      })
      .then((response) => {
        const $previousTotal = response.data.total;
        const $currentTotal = prices.reduce(
          (total, sale) => total + sale.sales_total,
          0
        );
        const $difference = $currentTotal - $previousTotal;
        const $trend = $difference > 0 ? "up" : "down";

        setSalesData({ difference: $difference, trend: $trend }); // Get the top 3 provinces
      });
    }
  }, [
    filter.commodity,
    filter.grade,
    filter.period,
    filter.weight,
    prices,
    pricesUrl,
  ]);

  

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {salesData?.trend === 'up' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faArrowUp} style={{ color: 'green' }} />
            <span style={{ marginLeft: '8px', color: 'green' }}>
              R{formatAmount(salesData.difference ?? 0)}
            </span>
          </div>
          <span style={{ color: 'green' }}>Last {filter.period} months</span>
        </>
      )}
      {salesData?.trend === 'down' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faArrowDown} style={{ color: 'red' }} />
            <span style={{ marginLeft: '8px', color: 'red' }}>
              R{formatAmount(salesData.difference ?? 0)}
            </span>
          </div>
          <span style={{ color: 'red' }}>Last {filter.period} months</span>
        </>
      )}
    </div>
  );
};
