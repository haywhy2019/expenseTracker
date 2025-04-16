import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";

import { GlobalStyles as Colors } from "@/constants/styles";

type InputProps = {
  label: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  secure?: boolean | undefined;
  onUpdateValue: (item: string) => void;
  value: string;
  isInvalid: boolean;
};

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "bold",
  },
  labelInvalid: {
    color: Colors.colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderRadius: 4,
    fontSize: 16,
    borderColor: "black",
    borderWidth: 1,
  },
  inputInvalid: {
    backgroundColor: Colors.colors.error500,
  },
});
