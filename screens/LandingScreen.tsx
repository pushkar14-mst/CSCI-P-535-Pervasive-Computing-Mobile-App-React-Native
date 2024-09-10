import LottieView from "lottie-react-native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const LandingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={{
          uri: "https://lottie.host/7656dee7-201b-4cee-9f98-4da1bc5dda48/CkvVumkIER.json",
        }}
        autoPlay
        loop
        style={{ width: "100%", height: 250 }}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("SignIn")}
        style={styles.filledButton}
      >
        Sign In
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("SignUp")}
        style={styles.outlinedButton}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#071952",
  },
  title: {
    marginBottom: 40,
  },
  outlinedButton: {
    marginVertical: 10,
    width: "80%",
    color: "#ffffff",
  },
  filledButton: {
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#37B7C3",
  },
});

export default LandingScreen;
