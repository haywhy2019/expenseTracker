import { View, Text } from "react-native";
import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";
import ManageExpenses from "../screens/ManageExpenses";
import ExpensenseOverView from "./BottomTabs";
import { GlobalStyles } from "@/constants/styles";
import IconButton from "@/components/UI/IconButton";
import { AuthContext } from "@/store/AuthContext";
import ChartScreen from "../screens/ChartScreen";
import SmartOCRExpense from "../screens/OcrSmartExpense";

const Stack = createNativeStackNavigator();

const Navigation = () => {
 
  return (
    <>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          headerShown: false,
        }}
      >
        <Stack.Screen name="ExpensesOverview" component={ExpensenseOverView} />
        <Stack.Screen name="ManageExpenses" component={ManageExpenses} />
        <Stack.Screen name="Analysis" component={ChartScreen} />
        <Stack.Screen name="OcrScreen" component={SmartOCRExpense} />
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
