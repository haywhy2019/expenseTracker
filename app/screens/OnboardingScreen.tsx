// app/screens/OnboardingScreen.tsx
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

import { View, Text, Image, StyleSheet } from "react-native";

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#6DBE81",
          image: (
            <Image
              source={require("../../assets/images/finance1.jpg")}
              style={styles.image}
            />
          ),
          title: "Welcome to ExpManager",
          subtitle: "Track your expenses effortlessly and stay in control.",
        },
        {
          backgroundColor: "#F4B860",
          image: (
            <Image
              source={require("../../assets/images/category.jpg")}
              style={styles.image}
            />
          ),
          title: "Smart Categorization",
          subtitle: "Your spending is sorted into clear, useful categories.",
        },
        {
          backgroundColor: "#6792E0",
          image: (
            <Image
              source={require("../../assets/images/reports.jpg")}
              style={styles.image}
            />
          ),
          title: "Visual Reports",
          subtitle:
            "Get insights and charts to understand your spending habits.",
        },
        {
          backgroundColor: "#FF6B6B",
          image: (
            <Image
              source={require("../../assets/images/budget.jpg")}
              style={styles.image}
            />
          ),
          title: "Set Budgets",
          subtitle: "Define your goals and never overspend again.",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 500,
    resizeMode: "contain",
  },
});

export default OnboardingScreen;
