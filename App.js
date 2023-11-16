import React from "react";
import Toast from "react-native-toast-message";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import { Routes } from "./src/routes";

export default function App() {

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#0e7490"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <Routes />
      <Toast />
    </NativeBaseProvider>
  );
}
