import { useState } from "react";
import { Product } from "../../models/Product";
import styles from "./ProductList.module.scss";
import { Alert } from "@merlin-ui-kit/components/Alert/Alert";
import LoadingSpinner from "@merlin-ui-kit/components/Icons/LoadingSpinner";
import { useProducts } from "../../hooks/useProducts";

interface ProductListItemProps {
  product: Product;
  isSelected: boolean;
  onSelect: (productId: string) => void;
}

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
            <span className={styles["value"]}>
              {product.currencySymbol}
              {product.price}.00
            </span>
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
  const { products, loading, error } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  console.log(selectedProductId);

  const onSelect = (productId: string) => {
    console.log("here", productId);
    setSelectedProductId(productId);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Alert variant="danger" show={!!error}>
            {error}
          </Alert>
          <div className={styles["product-list"]}>
            <section className={styles["list-wrapper"]}>
              <ul>
                {products.map((product) => (
                  <ProductListItem
                    key={product?.id}
                    product={product}
                    isSelected={product?.id === selectedProductId}
                    onSelect={onSelect}
                  />
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </>
  );
};
