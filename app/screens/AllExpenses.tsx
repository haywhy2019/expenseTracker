import React, { useContext } from "react";
import ExpensesOutput from "@/components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "@/store/ExpensesContext";
import { View, Text, StyleSheet } from "react-native";
import Button from "@/components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "@/constants/styles";
import { RootStackParamList } from "@/constants/types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <>
      <ExpensesOutput
        expensesPeriod="Total"
        expenses={expensesCtx.expenses}
        fallbackText="No expenses found"
      />
      {expensesCtx?.expenses?.length > 0 && (
        <View style={styles.btnContainer}>
          <Button
            mode=""
            onPress={() => navigation.navigate("Analysis", { screen: 2 })}
          >
            View Analysis
          </Button>
        </View>
      )}
    </>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  btnContainer: {
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
