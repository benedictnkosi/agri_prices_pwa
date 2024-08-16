import axios from "axios";
import { BookingModel } from "../../models/Booking";
import styles from "./PayNowButton.module.scss";

interface PayNowButtonProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  booking: BookingModel;
}

const apiUrl = import.meta.env.VITE_API_URL;
const bookingUrl = `${apiUrl}/bookings`;

const PayNowButton: React.FC<PayNowButtonProps> = ({
  setLoading,
  setError,
  booking,
}) => {
  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response && error.response.status === 303) {
        const redirectUrl = error.response.data.redirectUrl;
        window.location.href = redirectUrl;
      }
      return Promise.reject(error);
    }
  );

  const createBooking = () => {
    setLoading(true);
    setError(null);
    const timeslot =
      new Date().toISOString().split("T")[0] + `T${booking.timeslot}`;

    axios
      .post(bookingUrl, {
        productId: booking.productId,
        availabilityId: timeslot,
        date: timeslot,
        unitItems: booking.unitItems,
      })
      .then((response) => {
        if (response.status !== 303) {
          setError(
            "An error occurred while creating the booking. Please try again."
          );
        } 
      })
      .catch((error) => {
        if (error.response && error.response.status !== 303) {
          console.error("Error fetching data: ", error);
          setError(
            "An error occured while creating the booking. Please try again."
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-4">
      <div className={styles["pay-button"]}>
        <button cy-tag="pay-now-button"
          className={`${styles["column"]} ${styles["button"]}`}
          onClick={() => createBooking()}
        >
          Pay with card
        </button>
      </div>
    </div>
  );
};

export default PayNowButton;
