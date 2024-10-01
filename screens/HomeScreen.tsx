import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Animated, PanResponder } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import { auth } from "../auth/config";
import { getStoredUser } from "../auth/database";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const currentUser = auth.currentUser;

  const scaleValue = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const fadeInOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchUserName = async () => {
      if (currentUser) {
        const storedUser = await getStoredUser();
        setUserName(storedUser?.displayName || currentUser.displayName);
      }
    };

    fetchUserName();

    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeInOpacity, {
      toValue: 1,
      duration: 6000, // 2 seconds fade-in
      useNativeDriver: true,
    }).start();
  }, [currentUser]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    // onPanResponderRelease: () => {
    //   Animated.spring(pan, {
    //     toValue: { x: 0, y: 0 },
    //     useNativeDriver: true,
    //   }).start();
    // },
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  });

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
            <Animated.Text
              style={[
                styles.loggedInText,
                {
                  opacity: fadeInOpacity,
                  transform: [{ scale: scaleValue }],
                },
              ]}
            >
              Logged in
            </Animated.Text>

            <Image
              source={{
                uri: "https://lumiere-a.akamaihd.net/v1/images/bb-8-main_72775463.jpeg?region=320%2C51%2C567%2C425",
              }}
              style={styles.image}
            />
            <Animated.Text
              style={[
                styles.title,
                {
                  transform: [{ scale: scaleValue }],
                },
              ]}
            >
              Welcome to My App, {userName}
            </Animated.Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {currentUser.email}
            </Text>
            <Button mode="contained" onPress={signOut} style={styles.button}>
              Sign Out
            </Button>

            <Animated.View
              {...panResponder.panHandlers}
              style={[
                {
                  transform: [{ translateX: pan.x }, { translateY: pan.y }],
                },
                styles.gestureObject,
              ]}
            >
              <Text style={styles.gestureText}>Drag me!</Text>
            </Animated.View>
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
    fontSize: 24,
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
  gestureObject: {
    width: 150,
    height: 150,
    backgroundColor: "#37B7C3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    marginTop: 20,
  },
  gestureText: {
    color: "#fff",
  },
  loggedInTextContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#37B7C3",
    position: "absolute",
    width: "100%",
  },
  loggedInText: {
    position: "absolute",
    top: 50, // Adjust position as needed
    fontSize: 22,
    color: "#fff",
  },
});

export default HomeScreen;
