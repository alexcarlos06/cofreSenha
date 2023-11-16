import { Text, Box, Button, Avatar, HStack, VStack, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export function HeaderHome() {
  const navigation = useNavigation();

  function handleAdd() {
    navigation.navigate('Form');
  }

  return (
    <Box
      bg={"primary.700"}
      width={"100%"}
      height={178}
      justifyContent={"center"}
    >
      <HStack
        justifyItems={"space-between"}
        space={25}
        padding={2}
        marginLeft={6}
      >
        <Avatar
          source={{
            uri: "https://avatars.githubusercontent.com/u/64445525?v=4",
          }}
        />
        <VStack>
          <Text color={"#fff"} fontSize={"lg"}>
            Olá, Alex ^^
          </Text>
          <Text color={"#fff"} fontSize={"xs"}>
            Aqui você está seguro
          </Text>
        </VStack>
        <Button
          startIcon={
            <Icon as={MaterialIcons} name="add" size={30} color="#fff" />
          }
          variant="outline"
          onPress={handleAdd}
        />
      </HStack>
    </Box>
  );
}
