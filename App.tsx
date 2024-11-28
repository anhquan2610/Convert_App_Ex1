import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type Unit = "Metre" | "Millimetre" | "Mile" | "Foot";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit>("Metre");
  const [toUnit, setToUnit] = useState<Unit>("Millimetre");
  const [result, setResult] = useState("");

  const units: Unit[] = ["Metre", "Millimetre", "Mile", "Foot"];

  const convertLength = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      Alert.alert("Invalid input", "Please enter a valid number.");
      return;
    }

    const conversionRates: Record<Unit, Record<Unit, number>> = {
      Metre: { Metre: 1, Millimetre: 1000, Mile: 0.000621371, Foot: 3.28084 },
      Millimetre: {
        Metre: 0.001,
        Millimetre: 1,
        Mile: 6.2137e-7,
        Foot: 0.00328084,
      },
      Mile: { Metre: 1609.34, Millimetre: 1609340, Mile: 1, Foot: 5280 },
      Foot: { Metre: 0.3048, Millimetre: 304.8, Mile: 0.000189394, Foot: 1 },
    };

    const convertedValue = value * conversionRates[fromUnit][toUnit];
    setResult(`${inputValue} ${fromUnit} = ${convertedValue} ${toUnit}`);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}> Converter Application</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter value"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <View style={styles.pickerContainer}>
          <View style={styles.borderPicker}>
            <Picker
              selectedValue={fromUnit}
              style={styles.picker}
              onValueChange={(itemValue: Unit) => setFromUnit(itemValue)}
            >
              {units.map((unit) => (
                <Picker.Item key={unit} label={unit} value={unit} />
              ))}
            </Picker>
          </View>
          <View style={styles.borderPicker}>
            <Picker
              selectedValue={toUnit}
              style={styles.picker}
              onValueChange={(itemValue: Unit) => setToUnit(itemValue)}
            >
              {units.map((unit) => (
                <Picker.Item key={unit} label={unit} value={unit} />
              ))}
            </Picker>
          </View>
        </View>

        <Button title="Convert" onPress={convertLength} />
        {result !== "" && <Text style={styles.result}>{result}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FEF9D9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 3,
    borderColor: "#B7B7B7",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 18,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  borderPicker: {
    borderWidth: 3,
    flex: 1,
    height: 50,
    borderColor: "#B7B7B7",
  },
  picker: {
    flex: 1,
    textAlign: "center",
    borderWidth: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
