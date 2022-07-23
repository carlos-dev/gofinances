import React, { useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  View,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { RootStackParamList } from "../../routes/app.routes";

import { Container, Form, Header, Title, TransactionsTypes } from "./styles";

type ListScreenProp = BottomTabNavigationProp<RootStackParamList, 'Listagem'>;

const schema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  amount: Yup.number()
    .typeError("informe um valor numérico")
    .positive("o valor deve ser positivo"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const navigation = useNavigation<ListScreenProp>();

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypesSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister() { 
    if (!transactionType)
      return Alert.alert("Erro", "Selecione o tipo de transação");

    if (category.key === "category")
      return Alert.alert("Erro", "Selecione uma categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      ...getValues(),
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const dataKey = "@gofinances:transactions";

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFomatted = [
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFomatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log("register", error);
      Alert.alert("Erro", "Não foi possível salvar");
    }
  }

  const errorNameMessage = errors.name?.message as unknown as string;
  const errorAmountMessage = errors.amount?.message as unknown as string;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <View>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errorNameMessage}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errorAmountMessage}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="income"
                onPress={() => handleTransactionsTypesSelect("positive")}
                isActive={transactionType === "positive"}
              />

              <TransactionTypeButton
                type="down"
                title="outome"
                onPress={() => handleTransactionsTypesSelect("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </View>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
