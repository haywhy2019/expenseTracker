import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Navigation from "./navigation/Navigation";
import AuthNavigation from "./navigation/AuthNavigation";
import { AuthContext } from "@/store/AuthContext";

const App = () => {
  const authCtx = useContext(AuthContext);
  return <>{authCtx.isAuthenticated ? <Navigation /> : <AuthNavigation />}</>;
};

export default App;

const styles = StyleSheet.create({});
