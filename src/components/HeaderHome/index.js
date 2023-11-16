import { Text, Box, Button, Avatar, HStack, VStack, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function HeaderHome() {
  const navigation = useNavigation();

  async function obterDadosSalvos() {
    try {
      const dadosSalvos = await AsyncStorage.getItem(
        "@cofresenha:configuracao"
      );

      if (dadosSalvos !== null) {
        const parsedData = JSON.parse(dadosSalvos);
        return parsedData;
      }
    } catch (error) {
      console.error("Erro ao recuperar os dados do formulário:", error);
    }
  }

  const [dadosConfiguracao, setDadosConfiguracao] = useState({});

  // IIFE para executar a função assíncrona e atualizar o estado
  useEffect(() => {
    (async () => {
      const dadosSalvos = await obterDadosSalvos();
      setDadosConfiguracao(dadosSalvos || {});
    })();
  }, []); // O array vazio assegura que a função é executada apenas uma vez (equivalente ao componentDidMount)



  function handleAdd() {
    navigation.navigate("Form");
  }

  return (
    <Box
      bg={"primary.700"}
      width={"100%"}
      height={178}
      justifyContent={"center"}
    >
      <HStack
        justifyContent={"space-between"}
        space={25}
        padding={2}
        marginLeft={6}
      >
        <Avatar
          source={{
            uri: dadosConfiguracao.urlFoto,
          }}
        />
        <VStack>
          <Text color={"#fff"} fontSize={"lg"}>
            {`Olá,  ${dadosConfiguracao.nome}^^`}
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