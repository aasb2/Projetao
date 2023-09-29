import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { createNewUserDocument } from '../services/functions/login/loginUser';
import * as WebBrowser from 'expo-web-browser';
import * as Google from "expo-auth-session/providers/google"
import { Login } from "./login/Login";
import { useNavigation } from 'expo-router'


WebBrowser.maybeCompleteAuthSession();

export default function Index() {
    WebBrowser.maybeCompleteAuthSession();
    const navigation = useNavigation();


    const [userInfo, setUserInfo] = useState<User | null>();
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "100988905326-mslpnvg22mbk52vuee73q9updl5k8vm0.apps.googleusercontent.com",
        webClientId: "100988905326-q1b6e6imq9ei9ae76via0fk9h862f83u.apps.googleusercontent.com"
    })

    const checkLocalUser = async () => {
        try {
            const userJSON = await AsyncStorage.getItem("@user");
            const userData = userJSON ? JSON.parse(userJSON) : null;
            setUserInfo(userData);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        console.log('entre aq dnv')
        checkLocalUser();
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(JSON.stringify(user, null, 2));
                await AsyncStorage.setItem("@user", JSON.stringify(user));
                setUserInfo(user);
                if (!response?.type) {
                    navigation.navigate('(tabs)');
                }                
            } else {
                setUserInfo(null);
            }
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        if (response?.type == "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
            .then((result) => {
                createNewUserDocument(result.user)
                setUserInfo(result.user);
                navigation.navigate('CheckIn');
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [response]);

    return <Login promptAsync={promptAsync} />;
}