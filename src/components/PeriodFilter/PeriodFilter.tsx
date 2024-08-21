import styles from "../Pages.module.scss";
import { Button } from "flowbite-react";

interface PeriodFilterProps {
  setPeriod: (period: string) => void;
  period: string;
}


export const PeriodFilter : React.FC<PeriodFilterProps> = ({
  setPeriod,
  period
}) => {
  

  return (
    <div className="container mt-4">
    <div className={styles["market-list"]}>
      <div className={styles["section-header"]}>How much data do you want to see?</div>
      <div className={styles["card-container"]}>
      <Button onClick={() => setPeriod("1")}  gradientDuoTone="greenToBlue"
        {...(period !== "1" && { outline: true })}
        >
        1 Month
      </Button>
      <Button onClick={() => setPeriod("6")}  gradientDuoTone="greenToBlue"
        {...(period !== "6" && { outline: true })}
        >
        6 Month
      </Button>
      <Button onClick={() => setPeriod("12")}  gradientDuoTone="greenToBlue"
        {...(period !== "12" && { outline: true })}
        >
        12 Month
      </Button>
      </div>
    </div>
  </div>
  );
};
