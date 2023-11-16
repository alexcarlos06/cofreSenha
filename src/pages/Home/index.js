import { useCallback, useState } from "react";
import { FlatList, Text, Box, Button } from "native-base";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderHome } from "../../components/HeaderHome";
import { Cards } from "../../components/Cards";

export function Home() {
  const [data, setData] = useState([]);
  const { getItem, setItem } = useAsyncStorage("@cofresenha:senhas");

  async function handleFechData() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    setData(data);
  }

  async function handleRemove(id) {
    const response = await getItem();
    const previusData = response ? JSON.parse(response) : [];

    const data = previusData.filter((item) => item.id !== id);
    setItem(JSON.stringify(data));
    setData(data);
  }

  useFocusEffect(
    useCallback(() => {
      handleFechData();
    }, [])
  );
  return (
    <Box flex={1} backgroundColor={"#f2f3f5"}>
      <HeaderHome />
      <Box
        flexDir={"row"}
        alignItems={"center"}
        marginTop={10}
        justifyContent={"space-between"}
        marginBottom={5}
        paddingX={4}
      >
        <Text fontSize={20} fontWeight={"bold"} color={"#3d434d"}>
          Suas senhas
        </Text>
        <Text fontSize={13} color={"#888d97"}>{`${data.length} ao total`}</Text>
      </Box>
      <FlatList
        flex={1}
        width={"100%"}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Cards data={item} onPress={() => handleRemove(item.id)} />
        )}
      />
      <Button variant={"subtle"} colorScheme="secondary">
        Limpar
      </Button>
    </Box>
  );
}
