import { useEffect, useState } from "react";
import { MarketList } from "./MarketList/MarketList";
import { Spinner } from "flowbite-react";

export const Markets = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);


  if (loading) {
    return <div className="text-center">
    <Spinner aria-label="Extra large spinner example" size="xl" />
  </div>;
  }

  return (
    <>
      <MarketList/>
    </>
  );
};
