import { Text, View } from "react-native";
import Navigation from "./navigation/Navigation";
import ExpensesContextProvider from "@/store/ExpensesContext";
import AuthNavigation from "./navigation/AuthNavigation";
import AuthContextProvider from "@/store/AuthContext";
import App from "./App";

export default function Index() {
  return (
    <AuthContextProvider>
      <ExpensesContextProvider>
        <App />
      </ExpensesContextProvider>
    </AuthContextProvider>
  );
}
