import React, { useEffect } from "react";
import { CInput } from "../../components/Input";
import { Box, Button, Text, Icon } from "native-base";
import { HeaderForm } from "../../components/HeaderForm";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";


export function Configuracao() {
  const schema = yup.object({
    nome: yup.string().required("Informe a url da foto do perfil."),
    urlFoto: yup.string().required("informe como deseja ser chamado."),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { getItem, setItem } = useAsyncStorage("@cofresenha:configuracao");

  async function handleNew(data) {
    try {
      await setItem(JSON.stringify(data));

      Toast.show({
        type: "success",
        text1: "Configurações cadastradas com sucesso!",
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar!",
        text2: "Contate o Desenvolvedor do App",
      });
    }
  }

  const obterDadosSalvos = async () => {
    try {
      // Obter os dados salvos do AsyncStorage
      const dadosSalvos = await getItem();
      if (dadosSalvos !== null) {
        const parsedData = JSON.parse(dadosSalvos);
        // Setar os valores no formulário
        Object.keys(parsedData).forEach((key) => {
          setValue(key, parsedData[key])
          });
      }
    } catch (error) {
      console.error("Erro ao recuperar os dados do formulário:", error);
    }
  };
  useEffect(() => {
    obterDadosSalvos();
  }, []);
  return (
    <Box flex={1}>
      <HeaderForm titulo={"Cadastro do sistema"} />
      <Box
        marginTop={5}
        alignItems={"center"}
        justifyItems={"center"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Controller
          control={control}
          name="nome"
          render={({ field: { value, onChange } }) => (
            <CInput
              width={"90%"}
              title={"Informe como deseja ser chamado"}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.nome && (
          <Text color={"#ff375b"} fontSize="xs" marginTop={1}>
            <Icon
              as={<Feather name="alert-circle" size={"xs"} />}
              color={"#ff375b"}
            />{" "}
            {errors.nome?.message}{" "}
          </Text>
        )}
        <Controller
          control={control}
          name="urlFoto"
          render={({ field: { value, onChange } }) => (
            <CInput
              width={"90%"}
              title={"Informe a url da foto de perfil"}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.urlFoto && (
          <Text color={"#ff375b"} fontSize="xs" marginTop={1}>
            <Icon
              as={<Feather name="alert-circle" size={"xs"} />}
              color={"#ff375b"}
            />{" "}
            {errors.urlFoto?.message}{" "}
          </Text>
        )}
        <Button marginTop={3} onPress={handleSubmit(handleNew)}>
          Salvar Configuração
        </Button>
      </Box>
    </Box>
  );
}
