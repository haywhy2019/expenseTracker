import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import DropDownInput from "../UI/DropDownInput";

const ExpenseForm = ({
  submitButtonlabel,
  onCancel,
  onSubmit,
  defaultValue,
}: {
  onCancel: () => void;
  onSubmit: (expense: any) => void;
  submitButtonlabel: string;
  defaultValue?: any;
}) => {
  const [inputValue, setInputValue] = useState({
    amount: defaultValue ? defaultValue?.amount?.toString() : "",
    date: defaultValue
      ? new Date(defaultValue?.date)?.toISOString().slice(0, 10)
      : "",
    desc: defaultValue ? defaultValue?.desc?.toString() : "",
    category: defaultValue ? defaultValue?.category : "",
  });

  function inputChangeHandler(inputIndentifier: string, enteredValue: string) {
    setInputValue((prev) => {
      return {
        ...prev,
        [inputIndentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount,
      date: new Date(inputValue.date),
      desc: inputValue.desc,
      category: inputValue.category,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.desc.trim().length > 0;
    const categoryIsValid = expenseData.category.trim().length > 0;
    if (
      !amountIsValid ||
      !dateIsValid ||
      !descriptionIsValid ||
      !categoryIsValid
    ) {
      Alert.alert("Invalid input", "Please check your input values");
      return;
    } else {
      console.log(expenseData);
      onSubmit(expenseData);
    }
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangeHandler.bind(this, "amount"),
          value: inputValue.amount,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangeHandler.bind(this, "date"),
          value: inputValue.date,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "desc"),
          value: inputValue.desc,
        }}
      />
      <DropDownInput handleSelect={inputChangeHandler.bind(this, "category")} />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonlabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
