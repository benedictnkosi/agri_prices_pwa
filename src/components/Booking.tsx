import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductList } from "./ProductList/ProductList";
import { Product } from "../models/Product";
import LoadingSpinner from "@merlin-ui-kit/components/Icons/LoadingSpinner";
import { Alert } from "@merlin-ui-kit/components/Alert/Alert";
import CustomerTypeSelector from "./CustomerTypeSelector/CustomerTypeSelector";
import AvailabilityCalendar from "./AvailabilityCalendar/AvailabilityCalendar";

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
          {error ? (
            <Alert variant="danger" show={!!error}>
              {error}
            </Alert>
          ) : (
            <>
              <ProductList products={products} onSelect={onSelect} />
              {selectedProduct && (
                <div key={selectedProduct.id}>
                  <CustomerTypeSelector
                    customerTypes={selectedProduct.customerTypes}
                  ></CustomerTypeSelector>
                  <AvailabilityCalendar
                    productId={selectedProduct.id}
                    currency={selectedProduct.currencySymbol}
                  ></AvailabilityCalendar>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
