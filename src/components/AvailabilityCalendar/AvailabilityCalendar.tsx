import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./AvailabilityCalendar.module.scss";
import { useAvailability } from "../../hooks/useAvailability";
import LoadingSpinner from "@merlin-ui-kit/components/Icons/LoadingSpinner";
import { Alert } from "@merlin-ui-kit/components/Alert/Alert";

interface AvailabilityCalendarProps {
  productId: string;
  currency: string;
  setSelectedTime: (timeslot: string) => void;
  selectedTime: string | null;
}
const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  productId,
  currency,
  setSelectedTime,
  selectedTime,
  
}) => {
  const { timeSlots, loading, error } = useAvailability(productId);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {error ? (
            <Alert variant="danger" show={!!error}>
              {error}
            </Alert>
          ) : (
            <div
              className={`container ${styles["time-selector-container"]} mt-4`}
            >
              <div className={styles["section-header"]}>
                What time are you visiting?
              </div>
              <div className={styles["time-selector-subheader"]}>
                Prices shown are for individual tickets
              </div>
              <div className="row g-3">
                {timeSlots.map((slot, index) => (
                  <div className="col-4 col-sm-3 col-md-2" key={index}>
                    <div
                      cy-tag="time-slots"
                      className={`${styles["time-slot"]} ${
                        selectedTime === slot.time ? styles["selected"] : ""
                      }`}
                      onClick={() => handleTimeSelect(slot.time)}
                    >
                      <div cy-tag="time-slot-time">{slot.time}</div>
                      <div cy-tag="time-slot-price" className={styles["price"]}>
                        {currency}
                        {slot.price}.00
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AvailabilityCalendar;
