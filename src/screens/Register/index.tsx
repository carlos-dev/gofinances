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

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import { Container, Form, Header, Title, TransactionsTypes } from "./styles";

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

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypesSelect(type: "up" | "down") {
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

    const data = getValues();

    try {
      const dataKey = "@gofinances:transactions";
      await AsyncStorage.setItem(dataKey, JSON.stringify(data));
    } catch (error) {
      console.log("register", error);
      Alert.alert("Erro", "Não foi possível salvar");
    }
    console.log(data);
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
                onPress={() => handleTransactionsTypesSelect("up")}
                isActive={transactionType === "up"}
              />

              <TransactionTypeButton
                type="down"
                title="outome"
                onPress={() => handleTransactionsTypesSelect("down")}
                isActive={transactionType === "down"}
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
