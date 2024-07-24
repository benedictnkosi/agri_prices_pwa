import { useState } from "react";
import { Product } from "../../models/Product";
import styles from "./ProductList.module.scss";

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

interface ProductListProps {
  products: Product[];
  onSelect: (productId: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onSelect,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const onProductSelected = (id: string) => {
    setSelectedProductId(id);
    onSelect(id);
  };
  return (
    <div className="container mt-4">
      <div className={styles["product-list"]}>
        <div className={styles["section-header"]}>
          What type of ticket do you need?
        </div>
        <section className={styles["list-wrapper"]}>
          <ul>
            {products.map((product) => (
              <ProductListItem
                key={product?.id}
                product={product}
                isSelected={product?.id === selectedProductId}
                onSelect={onProductSelected}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
