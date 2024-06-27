import { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import axios from "axios";
import styles from "./ProductList.module.scss";

interface ProductListItemProps {
  product: Product;
  isSelected: boolean;
  onSelect: (productId: string) => void;
}

const apiUrl = import.meta.env.VITE_PRODUCTS_API_URL
console.log("API URL:", apiUrl);

const ProductListItem = ({
  product,
  isSelected,
  onSelect,
}: ProductListItemProps) => {
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onSelect(product.id);
  };
  return (
    <li
      className={`${styles["container"]} ${isSelected && styles["selected"]}`}
    >
      <div className={styles["details"]}>
        <span className={styles["title"]}>{product.name}</span>
        <p>{product.description}</p>
      </div>
      <div
        className={`${styles["footer"]} ${isSelected && styles["selected"]}`}
      >
        <div className={styles["column"]}>
          <div className={styles["price"]}>
            <span className={styles["row"]}>From</span>
            <span className={styles["value"]}>£{product.price}.00</span>
          </div>
        </div>
        <button
          className={`${styles["column"]} ${styles["button"]}`}
          onClick={onClick}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
    </li>
  );
};

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  console.log(selectedProductId);

  const onSelect = (productId: string) => {
    console.log("here", productId);
    setSelectedProductId(productId);
  };

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className={styles["product-list"]}>
      <section className={styles["list-wrapper"]}>
        <ul>
          {products.map((product) => (
            <ProductListItem
              product={product}
              isSelected={product?.id === selectedProductId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};
