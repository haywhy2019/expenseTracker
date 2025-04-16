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

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensenseOverView}
          options={{
            headerShown: false,

            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                color={tintColor}
                size={24}
                onPress={() => authCtx.logout}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ManageExpenses"
          component={ManageExpenses}
          // options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="Analysis"
          component={ChartScreen}
          // options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Navigation;
