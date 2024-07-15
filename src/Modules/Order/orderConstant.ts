export const orderFilterableFields = ["status", "searchTerm"];
export const orderSearchingField = [
  "address",
  "contact",
  "totalPrice",
  "status",
];

export type IOrderFilterRequest = {
  status?: string | undefined;
  searchTerm?: string | undefined;
};
