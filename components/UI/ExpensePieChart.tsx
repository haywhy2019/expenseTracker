import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { G, Text as SvgText } from "react-native-svg";
import { Expense } from "@/store/ExpensesContext";

type Slice = {
  pieCentroid: [number, number];
  data: {
    key: string;
    value: number;
    percentage: string;
    label: string;
    svg: { fill: string };
  };
};

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
      const percentage = ((amount / totalSpent) * 100).toFixed(0);
      return {
        key: category,
        value: amount,
        percentage,
        label: `${percentage}%`,
        category,
        svg: { fill: colors[index % colors.length] },
        arc: { outerRadius: "100%", padAngle: 0.02 },
      };
    }
  );

  const Labels = ({ slices }: { slices: Slice[] }) =>
    React.createElement(
      G,
      {},
      slices.map((slice, index) => {
        const { pieCentroid, data } = slice;
        return React.createElement(
          SvgText as any,
          {
            key: `label-${index}`,
            x: pieCentroid[0],
            y: pieCentroid[1],
            fill: "white",
            textAnchor: "middle",
            alignmentBaseline: "middle",
            fontSize: 12,
            stroke: "black",
            strokeWidth: 0.2,
          },
          data.label
        );
      })
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending by Category</Text>
      <Text style={styles.subTitle}>{duration}</Text>
      <PieChart
        style={{ height: 250 }}
        data={pieData}
        outerRadius={"80%"}
        labelRadius={60}
      >
        {((props: any) => <Labels slices={props.slices} />) as any}
      </PieChart>

      {/* 🧾 Legend */}
      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: item.svg.fill }]}
            />
            <Text style={styles.legendText}>
              {item.key.charAt(0).toUpperCase() + item.key.slice(1)} —{" "}
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
