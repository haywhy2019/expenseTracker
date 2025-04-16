import { View, StyleSheet } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "@/components/UI/IconButton";
import { GlobalStyles } from "@/constants/styles";
import { Expense, ExpensesContext } from "@/store/ExpensesContext";
import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "@/util/http";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import ErrorOverLay from "@/components/UI/ErrorOverLay";
import { AuthContext } from "@/store/AuthContext";

const ManageExpenses = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const authCtx = useContext(AuthContext);

  const token = authCtx.token;
  const editedExpenseId = route?.params?.expenseId;

  const isEditing = !!editedExpenseId;
  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id == editedExpenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteHandler() {
    setLoading(true);
    try {
      await deleteExpense(editedExpenseId, token);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete espense. please try again later");
    }

    setLoading(false);
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData: Expense) {
    setLoading(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData, token);
      } else {
        const id = await storeExpense(expenseData, token);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save Data - please try again later");
      setLoading(false);
    }
  }

  function errorHandler() {
    setError("");
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error && !loading) {
    return <ErrorOverLay message={error} onConfirm={errorHandler} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonlabel={isEditing ? "update" : "Add"}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary100,
    alignItems: "center",
  },
});
