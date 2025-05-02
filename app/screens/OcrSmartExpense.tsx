import Button from "@/components/UI/Button";
import DropDownInput from "@/components/UI/DropDownInput";
import ErrorOverLay from "@/components/UI/ErrorOverLay";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { RootStackParamList } from "@/constants/types/types";
import { AuthContext } from "@/store/AuthContext";
import { Expense, ExpensesContext } from "@/store/ExpensesContext";
import { updateExpense, storeExpense } from "@/util/http";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import TesseractOcr from "@devinikhiya/react-native-tesseractocr";
import { parseDateString } from "@/util/date";

const SmartOCRExpense = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [textLines, setTextLines] = useState<string[]>([]);
  const [amount, setAmount] = useState<string | undefined>("");
  const [date, setDate] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const token = authCtx.token;
  const expensesCtx = useContext(ExpensesContext);

  type ReceiptData = {
    date?: string;
    totalPrice?: string;
    descriptions: string[];
  };

  const extractReceiptDataFromText = (ocrText: string): ReceiptData => {
    const lines = ocrText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const dateRegex =
      /\b(?:\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})\b/;
    const totalRegex = /total/i;
    const priceRegex = /\$?\d+(?:[.,]\d{2})?/;

    const result: ReceiptData = {
      descriptions: [],
    };

    const descriptions = [];
    for (const line of lines) {
      const lower = line.toLowerCase();

      if (!result.date && dateRegex.test(line)) {
        const dateString = line.match(dateRegex)?.[0];
        setDate(dateString);
      } else if (
        !result.totalPrice &&
        totalRegex.test(lower) &&
        priceRegex.test(line)
      ) {
        const totalPrice = line.match(priceRegex)?.[0];
        setAmount(totalPrice?.replace(/[^0-9.-]+/g, ""));
      } else {
        descriptions.push(line);
        const stringDesc = descriptions.toString();
        const trimmed =
          stringDesc.length > 50 ? stringDesc.slice(0, 10) + "..." : stringDesc;
        setDescription(trimmed);
      }
    }
    return result;
  };

  const pickImage = async () => {
    // Ask for permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "We need access to your media library."
      );
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    console.log("text1");
    if (!result.canceled && result.assets && result.assets.length > 0) {
      
      const uri = result.assets[0].uri;
      setImageUri(uri);

      const path = result.assets?.at(0)?.uri;
      console.log(uri, "uri", path);
      try {
        if (uri) {
          const result = await TesseractOcr.recognize(uri, "eng", {});
          setTextLines(result);
          extractReceiptDataFromText(result);
        }
      } catch (error) {
        console.error(
          "Error recognizing text or extracting fields:",
          error?.toString()
        );
      }
    } else {
      console.log("No image selected or user cancelled.");
    }
  };

  async function confirmHandler(expenseData: any) {
    setLoading(true);
    try {
      const id = await storeExpense(expenseData, token);
      expensesCtx.addExpense({ ...expenseData, id: id });
      setAmount("");
      setDescription("");
      setLoading(false);
      setTimeout(() => {
        navigation.navigate("ExpensesOverview");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError("Could not save Data - please try again later");
    }
  }

  function submitHandler() {
    const expenseData = {
      amount: amount ? parseFloat(amount) : 0,
      date: date ? parseDateString(date) : "",
      desc: description ? description : "",
      category: category,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.desc.length > 0;
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
      confirmHandler(expenseData);
    }
  }

  function errorHandler() {
    setError("");
  }
  const handleCategory = (item: string) => {
    setCategory(item);
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error && !loading) {
    return <ErrorOverLay message={error} onConfirm={errorHandler} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.btn}>
        <Button onPress={pickImage}>Select Receipt Image</Button>
      </View>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <Text style={styles.title}>Auto-filled Expense</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={date}
          onChangeText={setDate}
        />
      </View>

      <DropDownInput handleSelect={handleCategory} />

      <View style={styles.btn}>
        <Button onPress={submitHandler}>Submit</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    backgroundColor: "white",
    fontSize: 18,
  },

  lineText: {
    fontSize: 14,
    marginBottom: 2,
  },
  textContainer: {
    borderWidth: 1,
    height: 100,
    borderRadius: 5,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  btn: {
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "bold",
  },
});

export default SmartOCRExpense;
