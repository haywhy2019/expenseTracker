import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "@/components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "@/store/ExpensesContext";
import { getDateMinusDays } from "@/util/date";
import { fetchExpenses } from "@/util/http";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import ErrorOverLay from "@/components/UI/ErrorOverLay";
import { AuthContext } from "@/store/AuthContext";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/types/types";
import Button from "@/components/UI/Button";
import { GlobalStyles } from "@/constants/styles";

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const authCtx = useContext(AuthContext);

  const token = authCtx.token;
  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses(token);
        expensesCtx.setExpense(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }

      setLoading(false);
    }
    getExpenses();
  }, []);

  const recentExpenses = expensesCtx.expenses.filter((expenses: any) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return new Date(expenses.date) > date7daysAgo;
  });

  function errorHandler() {
    setError("");
  }
  if (loading) {
    return <LoadingOverlay />;
  }

  if (error && !loading) {
    return <ErrorOverLay message={error} onConfirm={errorHandler} />;
  }

  return (
    <>
      <ExpensesOutput
        expensesPeriod="Last 7 days"
        expenses={recentExpenses}
        fallbackText="No expenses registered for the last 7 days"
      />
      {recentExpenses.length > 0 && (
        <View style={styles.btnContainer}>
          <Button
            mode=""
            onPress={() => navigation.navigate("Analysis", { screen: 1 })}
          >
            View Analysis
          </Button>
        </View>
      )}
    </>
  );
};

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

export default RecentExpenses;
