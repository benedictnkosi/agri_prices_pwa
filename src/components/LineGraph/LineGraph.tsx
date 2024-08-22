import React from "react";
import styles from "../Pages.module.scss";
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
  const groupedAVGData = prices.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
      if (!acc[date]) {
        acc[date] = { sum: 0, count: 0, lowSum: 0,highSum: 0 };
      }
      acc[date].sum += Number(item.average_price);
      acc[date].lowSum += Number(item.low_price);
      acc[date].highSum += Number(item.high_price);
      acc[date].count += 1;
      return acc;
    }, {} as Record<string, { sum: number; count: number; lowSum: number; highSum: number  }>);

  
  // Transform grouped data into the desired format
  const data = Object.keys(groupedAVGData).map((date) => ({
    date,
    "Average": Math.floor(groupedAVGData[date].sum / groupedAVGData[date].count),
    "Low": Math.floor(groupedAVGData[date].lowSum / groupedAVGData[date].count),
    "High": Math.floor(groupedAVGData[date].highSum / groupedAVGData[date].count),
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
              <Legend  />
              <Line
                type="monotone"
                dataKey="Average"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />

      <Line
                type="monotone"
                dataKey="Low"
                stroke="#ff0000"
                activeDot={{ r: 8 }}
              />

<Line
                type="monotone"
                dataKey="High"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
              
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
