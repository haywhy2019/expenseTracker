import currency from "currency.js";
export const formatCurrency = (
  amount: number | string,
  precision: number = 2,
  symbol: string = "£"
): string => {
  return currency(amount, {
    symbol,
    separator: ",",
    decimal: ".",
    precision,
  }).format();
};
