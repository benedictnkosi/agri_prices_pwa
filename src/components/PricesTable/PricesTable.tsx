import React, { useState } from "react";
import styles from "../Pages.module.scss";
import { Button, Table } from "flowbite-react";

interface PricesTableProps {
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
  }[]
}

export const PricesTable: React.FC<PricesTableProps> = ({ prices }) => {
  // Transform the data to extract date and average_price
  console.log("prices in line graph call " + prices);
  const [hasGrades, setHasGrades] = useState(false);
  const [showDetailedTable, setShowDetailedTable] = useState(false);

  const checkGrades =  () => {
    const gradesExist = prices.some((price: { grade: string }) => price.grade && price.grade.trim() !== '');
        setHasGrades(gradesExist);
  };

  useState(() => {
    checkGrades();
  });

  
  return (
    <div className="container mt-4">
      <div className={styles["market-list"]}>
        <div className={styles["section-header"]}>Detailed Prices</div>
        <div className={`${styles["card-container"]} ${styles["negative-margin-left"]}`}>
          <div className="overflow-x-auto">
            {showDetailedTable ? (
              <Table striped>
                <Table.Head className={styles["sticky-header"]}>
                  <Table.HeadCell>Weight</Table.HeadCell>
                  {hasGrades && <Table.HeadCell>Grade</Table.HeadCell>}
                  <Table.HeadCell>Low</Table.HeadCell>
                  <Table.HeadCell>High</Table.HeadCell>
                  <Table.HeadCell>AVG</Table.HeadCell>
                  <Table.HeadCell>Units</Table.HeadCell>
                  <Table.HeadCell>Sales Date</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {prices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((price, index) => (
                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{price.weight} kg</Table.Cell>
                      {hasGrades && <Table.Cell>{price.grade}</Table.Cell>}
                      <Table.Cell>R{price.low_price}</Table.Cell>
                      <Table.Cell>R{price.high_price}</Table.Cell>
                      <Table.Cell>R{price.average_price}</Table.Cell>
                      <Table.Cell>{price.sales_total}</Table.Cell>
                      <Table.Cell>{price.date.split('T')[0]}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <Button onClick={() => setShowDetailedTable(true)} outline>Show Detailed Table</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
