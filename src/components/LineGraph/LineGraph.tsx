import React from "react";
import styles from "./LineGraph.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineGraphProps {
  prices: {
    id: number;
    commodity: string;
    weight: string;
    grade: string;
    container: string;
    province: string;
    low_price: string;
    high_price: string;
    average_price: string;
    sales_total: number;
    total_quantity_sold: number;
    total_kg_sold: number;
    stock_on_hand: number;
    date: string;
  }[];
}

export const LineGraph: React.FC<LineGraphProps> = ({ prices }) => {
  // Transform the data to extract date and average_price
  console.log("prices in line graph call " + prices);

  // Group data by date and calculate the average of average_price
  const groupedData = prices.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    if (!acc[date]) {
      acc[date] = { sum: 0, count: 0 };
    }
    acc[date].sum += Number(item.average_price);
    acc[date].count += 1;
    return acc;
  }, {} as Record<string, { sum: number; count: number }>);

  // Transform grouped data into the desired format
  const data = Object.keys(groupedData).map((date) => ({
    date,
    average_price: groupedData[date].sum / groupedData[date].count,
  }));

  return (
    <div className={"container mt-4"}>
      <div className={styles["market-list"]}>
        <div className={styles["section-header"]}>Average Prices</div>
        <div
          className={`${styles["card-container"]} ${styles["negative-margin-left"]}`}
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="average_price"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
