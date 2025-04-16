// screens/ChartScreen.tsx
import ExpensePieChart from "@/components/UI/ExpensePieChart";
import { ExpensesContext } from "@/store/ExpensesContext";
import { getDateMinusDays } from "@/util/date";
import React, { useContext } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type RootStackParamList = {
  Analysis: {
    screen: number;
  };
};

type AnalysisRouteProp = RouteProp<RootStackParamList, "Analysis">;

const ChartScreen = () => {
  const route = useRoute<AnalysisRouteProp>();
  const { screen } = route.params;
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expenses: any) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return new Date(expenses.date) > date7daysAgo;
  });

  const getScreen = () => {
    if (screen == 1) {
      return true;
    } else {
      return false;
    }
  };
  console.log(screen, "screem", getScreen(), "test");

  return (
    <SafeAreaView>
      <ScrollView>
        <ExpensePieChart
          expenses={getScreen() ? recentExpenses : expensesCtx.expenses}
          duration={
            getScreen() ? "Last 7 days Analysis" : "All Expense Analysis"
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChartScreen;
