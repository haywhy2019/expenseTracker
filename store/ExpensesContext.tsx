import "react-native-get-random-values";
import React, { createContext, ReactNode, useReducer } from "react";
import { v4 as uuidv4 } from "uuid"; // Use a library to generate unique ids

export type Expense = {
  id: string;
  desc: string;
  amount: number;
  date: Date;
  category: string
};

// Context Type
type ExpensesContextType = {
  expenses: Expense[];
  setExpense: (expenses: Expense[]) => void;
  addExpense: (expense: any) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Omit<Expense, "id">) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  setExpense: () => {},
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

function expensesReducer(
  state: Expense[],
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "SET":
      const inverted = action.payload.reverse()
      return inverted;
    case "ADD":
      // Use uuidv4() to generate a unique id
      const newExpense = { ...action.payload, id: uuidv4() };
      return [newExpense, ...state];

    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (updateExpenseIndex === -1) return state; // if expense not found, do nothing

      const updatedExpenses = [...state];
      updatedExpenses[updateExpenseIndex] = {
        ...updatedExpenses[updateExpenseIndex],
        ...action.payload.data,
      };
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: { children: ReactNode }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: Omit<Expense, "id">) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpense(expenseData: Expense[]) {
    dispatch({ type: "SET", payload: expenseData });
  }
  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, updatedExpense: Omit<Expense, "id">) {
    dispatch({ type: "UPDATE", payload: { id, data: updatedExpense } });
  }

  const value: ExpensesContextType = {
    expenses: expensesState,
    setExpense,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
