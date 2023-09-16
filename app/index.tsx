import React from "react";
import { Login } from "./login/Login";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
    return (
        <Login/>        
    );
}