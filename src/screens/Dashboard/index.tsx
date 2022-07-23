import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getBottomSpace } from 'react-native-iphone-x-helper'

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserWrapper,
  UserGretting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];
    const transactionsFormatted: DataListProps[] = transactions.map((transaction: DataListProps) => {
      const amount = Number(transaction.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      const date = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(transaction.date));

      return {
        ...transaction,
        category: transaction.category,
        amount,
        date,
      }
    })

    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/31482507?v=4",
              }}
            />
            <User>
              <UserGretting>Olá</UserGretting>
              <UserName>Carlos</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          type="up"
          title="Total de Receitas"
          amount="R$ 1.000,00"
          lastTransaction="Há 1 hora"
        />
        <HighlightCard
          type="down"
          title="Total de Despesas"
          amount="R$ 1.000,00"
          lastTransaction="Há 1 hora"
        />
        <HighlightCard
          type="total"
          title="Saldo"
          amount="R$ 1.000,00"
          lastTransaction="Há 1 hora"
        />
      </HighlightCards>
      
      <Transactions>
        <Title>Transações</Title>

        <FlatList
          data={data}
          keyExtractor={(item: DataListProps) => item.id}
          renderItem={({ item }) => (
            <TransactionCard
              name={item.name}
              type={item.type}
              amount={item.amount}
              category={item.category}
              date={item.date}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: getBottomSpace() }}
        />
      </Transactions>
    </Container>
  );
}
