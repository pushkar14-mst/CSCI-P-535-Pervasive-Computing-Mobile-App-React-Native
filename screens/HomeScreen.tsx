import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { auth } from "../auth/config";
import { getStoredUser } from "../auth/database";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userName, setUserName] = React.useState<string | null>(null);
  const currentUser = auth.currentUser;
  useEffect(() => {
    const fetchUserName = async () => {
      if (currentUser) {
        const storedUser = await getStoredUser();
        setUserName(storedUser?.displayName || currentUser.displayName);
      }
    };

    fetchUserName();
  }, [currentUser]);

  const signOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out");
      navigation.navigate("Back");
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };
  return (
    <View style={styles.container}>
      {currentUser ? (
        <>
          <View style={styles.content}>
            <Image
              source={{
                uri: "https://lumiere-a.akamaihd.net/v1/images/bb-8-main_72775463.jpeg?region=320%2C51%2C567%2C425",
              }}
              style={styles.image}
            />
            <Text variant="headlineLarge" style={styles.title}>
              Welcome to My App, {userName}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {currentUser.email}
            </Text>
            <Button mode="contained" onPress={signOut} style={styles.button}>
              Sign Out
            </Button>
          </View>
          <Appbar style={styles.navbar}>
            <Appbar.Action icon="account" onPress={() => {}} />
            <Appbar.Action icon="magnify" onPress={() => {}} />
            <Appbar.Action icon="bell" onPress={() => {}} />
            <Appbar.Action icon="cog" onPress={() => {}} />
          </Appbar>
        </>
      ) : (
        <Text>You are not authenticated to view this page.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071952",
    color: "#ffffff",
  },
  navbar: {
    backgroundColor: "#37B7C3",
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
    color: "#ffffff",
  },
  subtitle: {
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
});

export default HomeScreen;
