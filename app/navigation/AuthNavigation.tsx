import { View, Text } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "expo-status-bar";
import ManageExpenses from "../screens/ManageExpenses";
import ExpensenseOverView from "./BottomTabs";
import { GlobalStyles } from "@/constants/styles";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import OnboardingScreen from "../screens/OnboardingScreen";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Sign up" }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigation;
