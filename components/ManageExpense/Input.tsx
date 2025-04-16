import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React from "react";
import { GlobalStyles } from "@/constants/styles";

type InputProps = {
  label: string;
  textInputConfig: any;
};
const Input = ({ label, textInputConfig }: InputProps) => {
  let inputStyles = styles.input;

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles = styles.inputMultiline;
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
});
