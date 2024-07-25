import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const productsUrl = `${apiUrl}/products`;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading(false);
    setError(null);
    axios
      .get(productsUrl)
      .then((response) => {
        if (response.data?.length === 0) {
          setError("No products found. Please try again.");
        } else {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(
          "There was an error getting products information. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    products,
    loading,
    error,
  };
};
