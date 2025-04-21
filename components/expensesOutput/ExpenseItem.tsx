import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/styles";
import { getFormattedDate } from "@/util/date";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/constants/types/types";
import { formatCurrency } from "@/util/currency";

const ExpenseItem = ({
  desc,
  amount,
  date,
  id,
}: {
  desc: string;
  amount: string;
  date: Date;
  id: string;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  function expensePressesHandler() {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  }
  return (
    <Pressable
      onPress={expensePressesHandler}
      android_ripple={{
        color: "rgba(0,0,0,0.1)", // Ripple Color
        borderless: false, // Ripple inside element
        radius: 200, // Optional: ripple size
      }}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {desc.slice(0, 10)}
          </Text>
          <Text style={styles.textBase}>
            {getFormattedDate(new Date(date))}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    minWidth: 80,
    textAlign: "center",
  },
});
