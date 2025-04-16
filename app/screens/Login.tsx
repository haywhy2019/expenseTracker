import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import AuthContent from "@/components/Auth/AuthContent";
import { login } from "@/util/http";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { AuthContext } from "@/store/AuthContext";
import { GlobalStyles } from "@/constants/styles";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  async function loginHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Login failed",
        "Please check your credentials or try again later"
      );
    }

    setLoading(false);
  }

  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Manage your expenses like a pro.</Text>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e2f4e8",
    textAlign: "center",
    marginBottom: 24,
  },
});
