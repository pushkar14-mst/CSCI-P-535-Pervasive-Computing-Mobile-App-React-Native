import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Animated, PanResponder } from "react-native";
import { Appbar, Button, Drawer, IconButton, Text } from "react-native-paper";
import { auth } from "../auth/config";
import { getStoredUser } from "../auth/database";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentUser = auth.currentUser;

  const scaleValue = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const fadeInOpacity = useRef(new Animated.Value(0)).current;
  const drawerAnim = useRef(new Animated.Value(-300)).current;
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
  const handleNavigation = (screen: string) => {
    setDrawerOpen(false); // Close drawer
    Animated.timing(drawerAnim, {
      toValue: -300, // Move drawer out of view
      duration: 300,
      useNativeDriver: true,
    }).start();
    navigation.navigate(screen);
  };
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    Animated.timing(drawerAnim, {
      toValue: drawerOpen ? -300 : 0, // Slide in/out
      duration: 300,
      useNativeDriver: true,
    }).start();
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

          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}
          >
            <View style={styles.drawerContent}>
              <Text style={styles.drawerTitle}>Menu</Text>
              <Button onPress={() => handleNavigation("Home")}>Home</Button>
              <Button onPress={() => handleNavigation("ImagePicker")}>
                Image Picker
              </Button>
              <Button onPress={() => handleNavigation("Location")}>
                Location
              </Button>
              <Button onPress={signOut}>Sign Out</Button>
              <IconButton
                icon="close"
                onPress={toggleDrawer}
                style={styles.closeButton}
              />
            </View>
          </Animated.View>

          <Appbar style={styles.navbar}>
            <Appbar.Action
              icon="home"
              onPress={() => navigation.navigate("Home")}
            />
            <Appbar.Action
              icon="image"
              onPress={() => navigation.navigate("ImagePicker")}
            />
            <Appbar.Action
              icon="map-marker"
              onPress={() => navigation.navigate("Location")}
            />
            <Appbar.Action
              icon="menu"
              onPress={toggleDrawer} // Toggle the drawer
            />
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
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: 300,
    backgroundColor: "#37B7C3",
    padding: 20,
    zIndex: 1,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  drawerContent: {
    flex: 1,
    justifyContent: "center",
  },
  drawerTitle: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
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
    top: 50,
    fontSize: 22,
    color: "#fff",
  },
});

export default HomeScreen;
