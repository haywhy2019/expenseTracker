// types.ts
export type RootStackParamList = {
  ManageExpenses: { expenseId: string }; // No params
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  Analysis: {screen: number};
  Profile: { userId: string }; // Example with params
};
