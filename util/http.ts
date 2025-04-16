import { Expense } from "@/store/ExpensesContext";
import axios from "axios";

const BACKEND_URL = "https://expense-tracker-fe67a-default-rtdb.firebaseio.com";
const API_KEY = "AIzaSyDSKWJhsRK9l5CgvGzXe9HE_jFidRiTl_E";

export async function storeExpense(expenseData: Expense, token:string) {
  const response = await axios.post(
    BACKEND_URL + `/expenses.json?auth=${token}`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses(token: string) {
  const response = await axios.get(
    BACKEND_URL + `/expenses.json?auth=${token}`
  );
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      desc: response.data[key].desc,
      category: response.data[key].category,
    };

    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id: string, expenseData: Expense, token: string) {
  return axios.put(
    BACKEND_URL + `/expenses/${id}.json?auth=${token}`,
    expenseData
  );
}

export async function deleteExpense(id: string, token: string) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json?auth=${token}`);
}

async function authenticate(mode: string, email: string, password: string) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
}
export function createUser(email: string, password: string) {
  return authenticate("signup", email, password);
}

export function login(email: string, password: string) {
  return authenticate("signInWithPassword", email, password);
}
