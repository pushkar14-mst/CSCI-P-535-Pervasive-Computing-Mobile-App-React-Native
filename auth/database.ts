import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  uid: string;
  email: string;
  displayName: string;
  birthdate: string;
  country: string;
  biography: string;
  gender: string;
}
const USER_KEY = "user";
const useSignUp = async (
  email: string,
  password: string,
  name: string,
  birthdate: string,
  country: string,
  gender: string,
  biography: string
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      name,
      birthdate,
      country,
      gender,
      biography,
      email,
      createdAt: new Date(),
    });

    await retrieveUser(userCredential.user.uid);
    // console.log("User signed up and data stored:", userCredential.user);
    return userCredential;
  } catch (error: any) {
    // console.error("Error signing up:", error.message);
    return Promise.reject(new Error(error.message));
  }
};

const useSignIn = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log("User signed in:", userCredential.user);
    await retrieveUser(userCredential.user.uid);
    return userCredential;
  } catch (error: any) {
    console.error("Error signing in:", error.message);
    throw new Error(error.message);
  }
};

const useSignOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error: any) {
    console.error("Error signing out:", error.message);
    throw new Error(error.message);
  }
};

const retrieveUser = async (uid: string) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData: User = {
        uid,
        email: userSnapshot.get("email"),
        displayName: userSnapshot.get("name") || "",
        birthdate: userSnapshot.get("birthdate") || "",
        country: userSnapshot.get("country") || "",
        gender: userSnapshot.get("gender") || "",
        biography: userSnapshot.get("biography") || "",
      };

      // Store the user data in AsyncStorage
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      console.log("User data stored in AsyncStorage");
      return userData;
    } else {
      console.log("No user data found in Firestore.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving or storing user data:", error);
    throw error;
  }
};

const getStoredUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    // console.error("Error retrieving user from AsyncStorage:", error);
    return null;
  }
};

const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    console.log("User data removed from AsyncStorage");
  } catch (error) {
    console.error("Error removing user from AsyncStorage:", error);
  }
};
export { useSignUp, useSignIn, useSignOut, getStoredUser, clearUser };
