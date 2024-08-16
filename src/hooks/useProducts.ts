import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const productsUrl = `${apiUrl}/products`;

const useProducts = (
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setLoading(true);
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
  }, [setLoading, setError]);

  return {
    products
  };
};

export default useProducts;
