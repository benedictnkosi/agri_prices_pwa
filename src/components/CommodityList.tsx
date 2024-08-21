import { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import styles from "./Pages.module.scss";
import commodities from "./commodities.json";
import { useParams } from 'react-router-dom';
import NavBar from "./NavBar/NavBar";


export const CommodityList = () => {
  const { type } = useParams<{ type: string }>(); // Grab the type from the URL
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = (commodity: string) => {
    navigate(`/prices/${commodity}`);
  };

  useEffect(() => {
    setLoading(false);
  }, []);


  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar showBackButton={true} />
      <div className="container mt-4">
        <div className={styles["market-list"]}>
          <div className={styles["section-header"]}>What are you interested in today?</div>
          <div className={styles["button-container"]}>
            {commodities
              .filter(commodity => commodity.type === type) // Filter based on the type from the URL
              .map((commodity, index) => (
                <Button key={index} onClick={() => handleClick(commodity.name)} gradientDuoTone="greenToBlue" outline>
                  {commodity.name}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
