import React, { useEffect } from "react";
import { Box, Button, Text, Icon } from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
import { HeaderForm } from "../../components/HeaderForm";
import { CInput } from "../../components/Input";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Feather } from "@expo/vector-icons";

export function Form() {
  const schema = yup.object({
    usuario: yup.string().required("Informe seu usuário!"),
    senha: yup.string().required("Informe sua senha!"),
    nome: yup.string().required("Informe o nome do serviço!"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });
  const { getItem, setItem } = useAsyncStorage("@cofresenha:senhas");

  async function handleNew(data) {
    try {
      const id = uuid.v4();
      data.id = id;
      const response = await getItem();
      const previusData = response ? JSON.parse(response) : [];
      const newData = [...previusData, data];

      await setItem(JSON.stringify(newData));

      Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso!",
      });

      reset();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar!",
        text2: "Contate o Desenvolvedor do App",
      });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "ppading" : "height"}
    >
      <Box padding={3}>
        <HeaderForm titulo={'Cadastro de Senhas'}/>

        <Controller
          control={control}
          name="nome"
          render={({ field: { value, onChange } }) => (
            <CInput
              title={"Nome do Serviço"}
              autoCapitalize="none"
              onChangeText={onChange}
              defaultValue=""
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
          name="usuario"
          render={({ field: { value, onChange } }) => (
            <CInput
              title={"Identificação de acesso"}
              autoCapitalize="none"
              onChangeText={onChange}
              defaultValue=""
            />
          )}
        />
        {errors.usuario && (
          <Text color={"#ff375b"} fontSize="xs" marginTop={1}>
            <Icon
              as={<Feather name="alert-circle" size={"xs"} />}
              color={"#ff375b"}
            />{" "}
            {errors.usuario?.message}{" "}
          </Text>
        )}
        <Controller
          control={control}
          name="senha"
          render={({ field: { value, onChange } }) => (
            <CInput
              title={"Senha"}
              autoCapitalize="none"
              onChangeText={onChange}
            />
          )}
        />
        {errors.senha && (
          <Text color={"#ff375b"} fontSize="xs" marginTop={1}>
            <Icon
              as={<Feather name="alert-circle" size={"xs"} />}
              color={"#ff375b"}
            />{" "}
            {errors.senha?.message}{" "}
          </Text>
        )}
        <Button onPress={handleSubmit(handleNew)} marginTop={3}>
          Salvar
        </Button>
      </Box>
    </KeyboardAvoidingView>
  );
}
