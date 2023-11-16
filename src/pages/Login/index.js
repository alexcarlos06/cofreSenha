import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Icon, Text } from "native-base";
import * as LocalAutentication from "expo-local-authentication";
import { MaterialIcons } from "@expo/vector-icons";

export function Login() {
  const navigation = useNavigation();
  const [isAutenticated, setIsAutenticated] = useState();

  async function verifyAvaiableAutentication() {
    const types = await LocalAutentication.supportedAuthenticationTypesAsync();
    const compatible = await LocalAutentication.hasHardwareAsync();
  }

  async function hadleAutentication() {
    const isBiometricEnroled = LocalAutentication.isEnrolledAsync();
    if (!isBiometricEnroled) {
      alert(
        "Login",
        "Nenhuma biometria encontrada. Por favor, cadastre no dispositivo"
      );
    }

    const auth = await LocalAutentication.authenticateAsync({
      promptMessage: "Login com Biometria",
      fallbackLabel: "Biometria não reconhecida",
    });
    setIsAutenticated(auth.success);
    if (isAutenticated) {
      navigation.navigate("Home");
    }
  }

  return (
    <Box
      alignItems={"center"}
      justifyItems={"center"}
      flex={1}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Button
        variant={"outline"}
        startIcon={
          <Icon
            as={MaterialIcons}
            size={"6xl"}
            color={"primary.500"}
            name="login"
          />
        }
        onPress={hadleAutentication}
      />
      <Button
        marginTop={3}
        variant={"ghost"}
        size={"sm"}
        leftIcon={<Icon as={MaterialIcons} name={"app-settings-alt"} />}
        onPress={() => navigation.navigate('Configuracao')}
      >
        Configuração
      </Button>
    </Box>
  );
}
