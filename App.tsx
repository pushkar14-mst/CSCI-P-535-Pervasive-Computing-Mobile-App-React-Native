import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpScreen from "./screens/SingUpScreen";
import SignInScreen from "./screens/SignInScreen";
import LandingScreen from "./screens/LandingScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        initialRouteName="LandingPage"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#37B7C3",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="Back"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: "Sign In" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
