import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import styles from "./Pages.module.scss";
import CommodityImage from "./CommodityImage/CommodityImage";
import commodities from "./commodities.json";
import { useParams } from 'react-router-dom';
import NavBar from "./CardWithButton copy/NavBar";


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
    <NavBar showBackButton={true}/>
      
    <div className="container mt-4">
      <div className={styles["market-list"]}>
        <div className={styles["section-header"]}>What are you interested in today?</div>
        {commodities
            .filter(commodity => commodity.type === type) // Filter based on the type from the URL
            .map((commodity, index) => (
            <CommodityImage
              key={index}
              title={commodity.name}
              image={commodity.image}
              onClick={() => handleClick(commodity.name)}
            />
          ))}
      </div>
    </div>
    </>
  );
};
