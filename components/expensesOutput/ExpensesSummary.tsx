import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/styles";
import { Expense } from "@/store/ExpensesContext";
import { formatCurrency } from "@/util/currency";

const ExpensesSummary = ({
  periodName,
  expenses,
}: {
  periodName: string;
  expenses: Expense[];
}) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{formatCurrency(expensesSum)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary400,
  },
});
