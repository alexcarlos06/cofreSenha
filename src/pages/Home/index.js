import { useCallback, useState } from "react";
import { FlatList, Text, Box, Button } from "native-base";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderHome } from "../../components/HeaderHome";
import { Cards } from "../../components/Cards";

export function Home() {
  const [data, setData] = useState([]);
  const { getItem, setItem  } = useAsyncStorage("@cofresenha:senhas");

  async function handleFechData() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    setData(data);
  }

  async function handleRemove(id) {
    const response = await getItem();
    const previusData = response ? JSON.parse(response) : [];

    const data = previusData.filter(item.id !== id);
    setItem(JSON.stringify(data));
    setData(data);
  }

  useFocusEffect(
    useCallback(() => {
      handleFechData();
      console.log(data)
    }, [])
  );
  return (
    <Box alignItems={"center"}>
      <HeaderHome />
      <Box>
        <Text>Suas senhas</Text>
      <Text>{`${data.length} ao total`}</Text>
      </Box>
      <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item})=><Cards data={item} onPress={ () => handleRemove(item.id)}
      />}
      />
      </Box>
  );
}
