import { useEffect, useState } from "react";
import axios from "axios";
import { BookingModel } from "../models/Booking";

const apiUrl = import.meta.env.VITE_API_URL;
const bookingUrl = `${apiUrl}/api/bookings`;


export const usePayNow = (booking: BookingModel) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading(false);
    setError(null);
    axios
      .post(`${bookingUrl}`, booking)
      .then((response) => {
      if (response.data?.dates?.length === 0) {
        setError("No timeslots found. Please try again.");
      } else {
        console.log(response.data);
      }
      })
      .catch((error) => {
      console.error("Error fetching data: ", error);
      setError(
        "There was an error getting timeslots information. Please try again."
      );
      })
      .finally(() => {
      setLoading(false);
      });
  }, [booking]);

  return {
    loading,
    error,
  };
};
