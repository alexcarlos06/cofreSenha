import { useState } from "react";
import { Text, Button, Box, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export function Cards(props) {
  const data = props.data;
  const onPress = props.onPress;

  const [passwordIsVisible, setpasswordIsVisible] = useState(false);
  function togglePasswordIsVisible() {
    setpasswordIsVisible((prevState) => !prevState);
  }
  return (
    <Box>
      <Button
        startIcon={
          <Icon
            as={MaterialIcons}
            name={"passwordIsVisible" ? "visibility" : "visibility-off"}
            size={22}
            color={"amber.600"}
          />
        }
      />
      <Box>
        <Box>
          <Text>{data.nome}</Text>
          {passwordIsVisible ? (
            <Text>{data.senha}</Text>
          ) : (
            <Text>{data.usuario}</Text>
          )}
        </Box>
      </Box>
      <Button
        onPress={onPress}
        startIcon={
          <Icon
            as={MaterialIcons}
            name="delete"
            size={22}
            color={"amber.600"}
          />
        }
      />
    </Box>
  );
}