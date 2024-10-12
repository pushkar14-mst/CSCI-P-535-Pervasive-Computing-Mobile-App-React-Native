import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import LandingScreen from "./screens/LandingScreen";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-native-paper";
import ImagePickerScreen from "./screens/ImagePickerScreen";
import LocationScreen from "./screens/LocationScreen";

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
// const HomeDrawer = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#37B7C3",
//         },
//         headerTintColor: "#fff",
//       }}
//     >
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Image Picker" component={ImagePickerScreen} />
//     </Drawer.Navigator>
//   );
// };

export default function App() {
  return (
    <Provider>
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ImagePicker"
            component={ImagePickerScreen}
            options={{ title: "Image Picker" }}
          />
          <Stack.Screen
            name="Location"
            component={LocationScreen}
            options={{ title: "Location" }}
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
    </Provider>
  );
}

// import React from "react";
// import { SafeAreaView, StatusBar } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createStackNavigator } from "@react-navigation/stack";
// import SignUpScreen from "./screens/SignUpScreen";
// import SignInScreen from "./screens/SignInScreen";
// import LandingScreen from "./screens/LandingScreen";
// import HomeScreen from "./screens/HomeScreen";
// import ImagePickerScreen from "./screens/ImagePickerScreen";
// import LocationScreen from "./screens/LocationScreen";
// import { Provider } from "react-native-paper";

// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#37B7C3",
//         },
//         headerTintColor: "#fff",
//       }}
//     >
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ title: "Home" }}
//       />
//     </Stack.Navigator>
//   );
// }

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#37B7C3",
//         },
//         headerTintColor: "#fff",
//       }}
//     >
//       <Drawer.Screen name="Home" component={HomeStack} />
//       <Drawer.Screen name="Image Picker" component={ImagePickerScreen} />
//       <Drawer.Screen name="Location" component={LocationScreen} />
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <Provider>
//       <NavigationContainer>
//         <StatusBar />
//         <Stack.Navigator
//           initialRouteName="LandingPage"
//           screenOptions={{
//             headerStyle: {
//               backgroundColor: "#37B7C3",
//             },
//             headerTintColor: "#fff",
//           }}
//         >
//           <Stack.Screen
//             name="Back"
//             component={LandingScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Main"
//             component={DrawerNavigator}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="SignUp"
//             component={SignUpScreen}
//             options={{ title: "Sign Up" }}
//           />
//           <Stack.Screen
//             name="SignIn"
//             component={SignInScreen}
//             options={{ title: "Sign In" }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }
