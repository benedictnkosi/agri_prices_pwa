import CardWithButton from "../CardWithButton/CardWithButton";
import styles from "../Pages.module.scss";
import markets from "./markets.json";
import { useNavigate } from "react-router-dom";

export const MarketList = () => {
  const navigate = useNavigate();

  const handleClick = (marketId: string) => {
    sessionStorage.setItem("market", marketId);
    navigate("/types");
  };
  return (
    <div className="container mt-4">
      <div className={styles["market-list"]}>
        <div className={styles["section-header"]}>Choose your market</div>
        {markets.map((market) => (
          <CardWithButton
          key={market.id}
            title={market.title}
            description={market.description}
            image={market.image}
            actionText="View Prices"
            onClick={() => handleClick(market.code)}
          />
        ))}
      </div>
    </div>
  );
};
