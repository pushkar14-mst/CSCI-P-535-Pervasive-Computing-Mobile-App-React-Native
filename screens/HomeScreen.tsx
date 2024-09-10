import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://lumiere-a.akamaihd.net/v1/images/bb-8-main_72775463.jpeg?region=320%2C51%2C567%2C425",
          }}
          style={styles.image}
        />
        <Text variant="headlineLarge" style={styles.title}>
          Welcome to My App
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Hey I am BB8 :)
        </Text>
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Get Started
        </Button>
      </View>
      <Appbar style={styles.navbar}>
        <Appbar.Action icon="account" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="bell" onPress={() => {}} />
        <Appbar.Action icon="cog" onPress={() => {}} />
      </Appbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff8d21",
  },
  navbar: {
    backgroundColor: "#ff7b00",
    justifyContent: "space-between",
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
});

export default HomeScreen;
