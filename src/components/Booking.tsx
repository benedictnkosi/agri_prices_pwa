import { useEffect, useState } from "react";
import useProducts from "../hooks/useProducts";
import { ProductList } from "./ProductList/ProductList";
import { Product } from "../models/Product";
import LoadingSpinner from "@merlin-ui-kit/components/Icons/LoadingSpinner";
import { Alert } from "@merlin-ui-kit/components/Alert/Alert";
import CustomerTypeSelector from "./CustomerTypeSelector/CustomerTypeSelector";
import AvailabilityCalendar from "./AvailabilityCalendar/AvailabilityCalendar";
import PayNowButton from "./PayNowButton/PayNowButton";
import { BookingModel } from "../models/Booking";

export const Booking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { products } = useProducts(setLoading, setError);

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [selectedCustomerType, setSelectedCustomerType] = useState<Record<number, number> | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [userBooking, setUserBooking] = useState<BookingModel | undefined>();

  // Initialize ticket counts when a product is selected
  const initialTicketCounts = selectedProduct?.customerTypes.reduce((acc, ticket) => {
    acc[ticket.id] = 0;
    return acc;
  }, {} as { [key: number]: number }) || {};

  const [ticketCounts, setTicketCounts] = useState<{ [key: number]: number }>(initialTicketCounts);

  useEffect(() => {
    const createBooking = (
      productId: string,
      timeslot: string,
      customerTypes: Record<number, number>
    ): BookingModel => {
      const unitItems = convertCustomerType(customerTypes);
      return {
        productId,
        availabilityId: timeslot,
        timeslot,
        unitItems,
      };
    };

    const hasSelectedCustomer = selectedCustomerType && Object.values(selectedCustomerType).some(value => value > 0);

    if (selectedProduct && hasSelectedCustomer && selectedTimeSlot) {
      console.log(selectedProduct.id, selectedTimeSlot, selectedCustomerType);
      const booking = createBooking(selectedProduct.id, selectedTimeSlot, selectedCustomerType);
      setUserBooking(booking);
    } else {
      setUserBooking(undefined);
    }
  }, [selectedProduct, selectedCustomerType, selectedTimeSlot]);

  const handleProductSelect = (productId: string) => {
    const selected = products.find(product => product.id === productId);
    setSelectedProduct(selected);
  };

  const convertCustomerType = (customerTypes: Record<number, number>) => {
    const unitItems: { unitId: string }[] = [];
    Object.entries(customerTypes).forEach(([unitId, count]) => {
      for (let i = 0; i < count; i++) {
        unitItems.push({ unitId });
      }
    });
    return unitItems;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="danger" show={!!error}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <ProductList products={products} onSelect={handleProductSelect} />
      {selectedProduct && (
        <div key={selectedProduct.id}>
          <CustomerTypeSelector
            customerTypes={selectedProduct.customerTypes}
            onCustomerTypeSelect={setSelectedCustomerType}
            ticketCounts={ticketCounts}
            setTicketCounts={setTicketCounts}
          />
          <AvailabilityCalendar
            productId={selectedProduct.id}
            currency={selectedProduct.currencySymbol}
            setSelectedTime={setSelectedTimeSlot}
            selectedTime={selectedTimeSlot}
          />
          {userBooking && (
            <PayNowButton
              setLoading={setLoading}
              setError={setError}
              booking={userBooking}
            />
          )}
        </div>
      )}
    </>
  );
};
