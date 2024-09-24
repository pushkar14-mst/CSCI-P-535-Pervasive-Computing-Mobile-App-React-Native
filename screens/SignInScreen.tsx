import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { getStoredUser, useSignIn } from "../auth/database";
import LoadingModal from "../components/UI/LoadingModal";

const SignInScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStoredEmail = async () => {
      const storedUser = await getStoredUser();
      if (storedUser && storedUser.email) {
        setUsername(storedUser.email);
      }
    };
    fetchStoredEmail();
  }, []);
  const onSignIn = async () => {
    if (!username || !password) {
      console.log("Please fill all the fields");
    }
    setIsLoading(true);
    const res = await useSignIn(username, password);
    if (res) {
      setIsLoading(false);
      navigation.navigate("Home");
      console.log("User signed in:", res.user);
    } else {
      setUsername("");
      setPassword("");
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Sign In
      </Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={onSignIn} style={styles.button}>
        Sign In
      </Button>
      <LoadingModal visible={isLoading} message="Signing you in...." />
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
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#37B7C3",
  },
});

export default SignInScreen;
