import { useState } from "react";
import { Text, Button, Box, Icon, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export function Cards(props) {
  const data = props.data;
  const onPress = props.onPress;

  const [passwordIsVisible, setpasswordIsVisible] = useState(false);
  function togglePasswordIsVisible() {
    setpasswordIsVisible((prevState) => !prevState);
  }
  return (
    <Box bg={"white"} padding={2} marginX={2}>
      <HStack justifyContent={"space-between"}>
        <Box flexDir={'row'}>
        <Button
          variant="unstyled"
          startIcon={
            <Icon
              as={MaterialIcons}
              name={passwordIsVisible ? "visibility" : "visibility-off"}
              size={"xl"}
              color={"primary.600"}
              onPress={togglePasswordIsVisible}
            />
          }
        />

        <Box>
          <Text fontWeight={"bold"}>{data.nome} </Text>
          {passwordIsVisible ? (
            <Text>{data.senha}</Text>
          ) : (
            <Text>{data.usuario}</Text>
          )}
        </Box>
        </Box>
        <Box>
          <Button
            variant="unstyled"
            h={'100%'}
            borderLeftWidth={1}
            borderLeftRadius={0}
            borderColor={'gray.200'}
            onPress={onPress}
            startIcon={
              <Icon
                as={MaterialIcons}
                name="delete"
                size={"md"}
                color={"primary.600"}
              />
            }
          />
        </Box>
      </HStack>
    </Box>
  );
}
