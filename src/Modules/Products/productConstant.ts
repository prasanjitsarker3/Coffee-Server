export const petFilterableFields = [
  "buyPackage",
  "isSpecial",
  "categoryId",
  "searchTerm",
];
export const petSearchingField = ["name", "description", "location"];

export type IPetFilterRequest = {
  species?: string | undefined;
  size?: string | undefined;
  gender?: string | undefined;
  searchTerm?: string | undefined;
};

export type IPaginationOptions = {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
};
