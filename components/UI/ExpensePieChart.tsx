import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Expense } from "@/store/ExpensesContext";

const screenWidth = Dimensions.get("window").width;

const ExpensePieChart = ({
  expenses,
  duration,
}: {
  expenses: Expense[];
  duration: string;
}) => {
  const categoryTotals: { [key: string]: number } = {};
  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const totalSpent = Object.values(categoryTotals).reduce(
    (acc, val) => acc + val,
    0
  );

  const colors = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"];

  const pieData = Object.entries(categoryTotals).map(
    ([category, amount], index) => {
      const percentage = ((amount / totalSpent) * 100).toFixed(0); // ✨
      return {
        name: category,
        amount,
        percentage,
        color: colors[index % colors.length],
        legendFontColor: "#7F7F7F",
        legendFontSize: 14,
      };
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending by Category</Text>
      <Text style={styles.subTitle}>{duration}</Text>
      <PieChart
        data={pieData.map((item) => ({
          name: item.name,
          population: item.amount, // chart-kit expects 'population'
          color: item.color,
          legendFontColor: item.legendFontColor,
          legendFontSize: item.legendFontSize,
        }))}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />

      {/* 🧾 Legend */}
      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)} —{" "}
              {item.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 32,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "bold",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 12,
    fontWeight: "bold",
  },
  legendContainer: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
});

export default ExpensePieChart;
