export type UnitItem = {
  unitId: string;
};

export type BookingModel = {
  productId: string;
  availabilityId: string;
  timeslot: string;
  unitItems: UnitItem[];
};