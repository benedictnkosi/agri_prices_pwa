import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductList } from "./ProductList/ProductList";
import { Product } from "../models/Product";
import LoadingSpinner from "@merlin-ui-kit/components/Icons/LoadingSpinner";
import { Alert } from "@merlin-ui-kit/components/Alert/Alert";
import CustomerTypeSelector from "./CustomerTypeSelector/CustomerTypeSelector";

export const Booking = () => {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  console.log(selectedProduct?.id);

  const onSelect = (productId: string) => {
    console.log("here", productId);
    setSelectedProduct(products.find((product) => product.id === productId));
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
          <ProductList products={products} onSelect={onSelect} />
          {selectedProduct && (
            <CustomerTypeSelector
              key={selectedProduct.id}
              customerTypes={selectedProduct.customerTypes}
            ></CustomerTypeSelector>
          )}
        </>
      )}
    </>
  );
};
