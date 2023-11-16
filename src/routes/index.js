import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../pages/Home";
import { Form } from "../pages/Form";
import { Login } from "../pages/Login";
import { Configuracao } from "../pages/Configuracao";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={Login} />
        <Screen name="Configuracao" component={Configuracao} />

        <Screen name="Home" component={Home} />
        <Screen name="Form" component={Form} />
      </Navigator>
    </NavigationContainer>
  );
}
