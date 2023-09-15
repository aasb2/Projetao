import * as React from "react";
import { Login } from "./login/Login";
//import Navegation from "./Nagevation";
import "react-native-gesture-handler";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signInWithPopup
} from "firebase/auth"
import { auth } from "../services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
    const [userInfo, setUserInfo] = React.useState();
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "100988905326-mslpnvg22mbk52vuee73q9updl5k8vm0.apps.googleusercontent.com",
        webClientId: "100988905326-q1b6e6imq9ei9ae76via0fk9h862f83u.apps.googleusercontent.com"
    })

    React.useEffect(() => {
        if (response?.type == "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
            signInWithPopup(auth, credential)
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    React.useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(JSON.stringify(user, null, 2));
                setUserInfo(user);
            } else {
                console.log("else");
            }
        });
        return () => unsub();
    }, []);

    return userInfo ? <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> : <Login promptAsync={promptAsync} />;
}