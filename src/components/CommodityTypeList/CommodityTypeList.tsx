import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import CardWithButton from "./../CardWithButton/CardWithButton";
import { useNavigate } from "react-router-dom";
import styles from "./CommodityTypeList.module.scss";

export const CommodityTypeList = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = (type: string) => {
    navigate(`/commodities/${type}`);
  };

  useEffect(() => {
    setLoading(false);
  }, []);


  if (loading) {
    return <Spinner />;
  }

  return (
    <>
    <div className="container mt-4">
      <div className={styles["market-list"]}>
        <div className={styles["section-header"]}>What are you interested in today?</div>
        <CardWithButton
          key='1'
          title='Fruits'
          description=''
          image='/images/fruits.jpg'
          actionText="View Prices"
          onClick={() => handleClick("fruit")}
        />
          <CardWithButton
          key='2'
            title='Vegetables'
            description=''
            image='/images/vegetables.jpg'
            actionText="View Prices"
            onClick={() => handleClick("vegetable")}
          />
      </div>
    </div>

      
    </>
  );
};
