import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

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
    console.log("User signed in:", userCredential.user);
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

export { useSignUp, useSignIn, useSignOut };
