import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Text, Button, Icon } from "native-base";


export function HeaderForm(props) {
  const navigation = useNavigation();
  return (
    <Box flexDir={"row"} height={100} width={"100%"} alignItems={"center"}>
      <Button
        zIndex={100}
        variant="unstyled"
        startIcon={
          <Icon
            as={MaterialIcons}
            name={"chevron-left"}
            size="10"
            color={"#0e7490"}
            onPress={navigation.goBack}
          />
        }
      />
      <Text
        flex={1}
        textAlign={"center"}
        fontSize={"20"}
        fontWeight={"bold"}
        color={"#3D434D"}
        marginRight={10}
      >
        {props.titulo}
      </Text>
    </Box>
  );
}
