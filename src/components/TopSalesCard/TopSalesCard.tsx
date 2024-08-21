import {  Card } from "flowbite-react";

interface TopSalesCardProps {
  amount: string;
  province: string,
}

const TopSalesCard: React.FC<TopSalesCardProps> = ({
  amount,
  province,
}) => {
  return (
    <Card
          className="w-36 mb-5"
          horizontal
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {amount}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
          {province}
          </p>
        </Card>
  );
};

export default TopSalesCard;