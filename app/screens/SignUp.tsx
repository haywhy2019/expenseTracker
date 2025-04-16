import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import AuthContent from "@/components/Auth/AuthContent";
import { createUser } from "@/util/http";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { AuthContext } from "@/store/AuthContext";
import { GlobalStyles } from "@/constants/styles";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signupHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Signup failed", "Please try again later");
    }

    setLoading(false);
  }

  if (loading) {
    return <LoadingOverlay />;
  }
  return (
    <View>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>
        Join ExpManager and start budgeting smarter.
      </Text>
      <AuthContent onAuthenticate={signupHandler} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
    textAlign: "center",
    paddingTop: 30,
  },
  subtitle: {
    fontSize: 16,
    color: GlobalStyles.colors.primary500,
    textAlign: "center",
    marginBottom: 24,
  },
});
