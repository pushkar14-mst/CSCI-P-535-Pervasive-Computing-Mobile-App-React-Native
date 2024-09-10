import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { DatePickerInput } from "react-native-paper-dates";

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [biography, setBiography] = useState("");

  const [countryOpen, setCountryOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);

  const onSignUp = () => {
    console.log({
      email,
      password,
      name,
      birthdate,
      country,
      gender,
      biography,
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Sign Up
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <DatePickerInput
        locale="en"
        label="Birthdate"
        value={birthdate}
        onChange={(d: any) => setBirthdate(d)}
        inputMode="start"
        style={{
          maxHeight: 80,
        }}
      />
      <DropDownPicker
        open={countryOpen}
        value={country}
        items={[
          { label: "United States", value: "us" },
          { label: "Canada", value: "ca" },
          { label: "India", value: "in" },
          { label: "United Kingdom", value: "uk" },
        ]}
        setOpen={setCountryOpen}
        setValue={setCountry}
        placeholder="Select your country"
        style={styles.dropdown}
      />
      <DropDownPicker
        open={genderOpen}
        value={gender}
        items={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ]}
        setOpen={setGenderOpen}
        setValue={setGender}
        placeholder="Select your gender"
        style={styles.dropdown}
      />
      <TextInput
        label="Biography"
        value={biography}
        onChangeText={setBiography}
        style={styles.input}
        multiline
      />
      <Button mode="contained" onPress={onSignUp} style={styles.button}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#071952",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  input: {
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#37B7C3",
  },
});

export default SignUpScreen;
