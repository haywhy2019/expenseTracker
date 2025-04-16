import { View, StyleSheet, Text } from "react-native";
import React from "react";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "@/constants/styles";
import { Expense } from "@/store/ExpensesContext";
import Button from "../UI/Button";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/types/types";

const ExpensesOutput = ({
  expensesPeriod,
  expenses,
  fallbackText,
}: {
  expenses: Expense[];
  expensesPeriod: string;
  fallbackText: string;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
 
  
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      {content}
      {/* {expenses.length > 0 && (
        <View style={styles.btnContainer}>
          <Button mode="" onPress={() => navigation.navigate("Analysis",{screen:expensesPeriod})}>
            View Analysis
          </Button>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  btnContainer: {
    marginTop: 20,
  },
});
export default ExpensesOutput;
