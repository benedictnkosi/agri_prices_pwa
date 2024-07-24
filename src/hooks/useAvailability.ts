import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const availabilityUrl = `${apiUrl}/availability`;

interface TimeSlot {
  time: string;
  price: string;
}

interface ApiTimeSlot {
  date: string;
  price: number;
}

const extractTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const parseTimeSlots = (apiTimeSlots: ApiTimeSlot[]): TimeSlot[] => {
  return apiTimeSlots.map((apiSlot) => {
    return {
      time: extractTime(apiSlot?.date),
      price: apiSlot?.price?.toString(),
    };
  });
};

export const useAvailability = (productId: string) => {
  const [timeSlots, setTimeslots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading(false);
    setError(null);
    axios
      .get(`${availabilityUrl}/${productId}`)
      .then((response) => {
        if (response.data?.dates?.length === 0) {
          setError("No timeslots found. Please try again.");
        } else {
          setTimeslots(parseTimeSlots(response.data?.dates));
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
  }, []);

  return {
    timeSlots,
    loading,
    error,
  };
};
