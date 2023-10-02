import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  User,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { createNewUserDocument } from "../services/functions/login/loginUser";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Login } from "./login/Login";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

export default function Index() {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleTabs = () => {
    navigation.navigate("(tabs)");
  };

  return <Login handleTabs={handleTabs} />;
}
