import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./CustomerTypeSelector.module.scss";
import { CustomerType } from "../../models/Product";

interface CustomerTypeSelectorProps {
  customerTypes: CustomerType[];
}

const CustomerTypeSelector: React.FC<CustomerTypeSelectorProps> = ({
  customerTypes,
}) => {
  const initialTicketCounts = customerTypes.reduce((acc, ticket) => {
    acc[ticket.id] = 0;
    return acc;
  }, {} as { [key: number]: number });

  const [ticketCounts, setTicketCounts] = useState<{ [key: number]: number }>(
    initialTicketCounts
  );

  const handleTicketChange = (id: number, increment: number) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max(0, prevCounts[id] + increment),
    }));
  };

  return (
    <div className="container mt-4 pb-4">
      <div className={styles["section-header"]}>
        How many tickets do you need?
      </div>
      {customerTypes.map((ticket) => (
        <CustomerTypeRow
          key={ticket.id}
          label={ticket.name}
          count={ticketCounts[ticket.id]}
          onIncrement={() => handleTicketChange(ticket.id, 1)}
          onDecrement={() => handleTicketChange(ticket.id, -1)}
        />
      ))}
    </div>
  );
};

interface CustomerTypeRowProps {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CustomerTypeRow: React.FC<CustomerTypeRowProps> = ({
  label,
  count,
  onIncrement,
  onDecrement,
}) => (
  <div className="m-4 border border-white border-opacity-25 rounded-1">
    <div className={`${styles["customer-type-row"]} row`}>
      <div cy-tag="customer-type" className="col-md-8">{label}</div>
      <div className="col-md-4 flex d-flex justify-content-end">
        <button cy-tag="decrement-btn"
          className="btn btn-secondary"
          onClick={onDecrement}
          disabled={count === 0}
        >
          −
        </button>
        <span cy-tag="customer-type-count">{count}</span>
        <button cy-tag="increment-btn" className="btn btn-secondary" onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  </div>
);

export default CustomerTypeSelector;
