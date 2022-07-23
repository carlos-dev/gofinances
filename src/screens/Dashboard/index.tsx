import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useFocusEffect } from "@react-navigation/native";

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

interface HighlightCardData {
  amount: string;
}

interface HighlightCardProps {
  entries: HighlightCardData;
  expensive: HighlightCardData;
  total: HighlightCardData;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightCard, setHighlightCard] = useState<HighlightCardProps>({} as HighlightCardProps);

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsResponse = response ? JSON.parse(response) : [];
    const transactionsFormatted: DataListProps[] = transactionsResponse.map((transaction: DataListProps) => {
      if (transaction.type === "positive") {
        entriesTotal += Number(transaction.amount);
      } else {
        expensiveTotal += Number(transaction.amount);
      }

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

    const total = entriesTotal - expensiveTotal;

    setHighlightCard({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      }
    });
    setTransactions(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

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
          amount={highlightCard.entries.amount}
          lastTransaction="Há 1 hora"
        />
        <HighlightCard
          type="down"
          title="Total de Despesas"
          amount={highlightCard.expensive.amount}
          lastTransaction="Há 1 hora"
        />
        <HighlightCard
          type="total"
          title="Saldo"
          amount={highlightCard.total.amount}
          lastTransaction="Há 1 hora"
        />
      </HighlightCards>
      
      <Transactions>
        <Title>Transações</Title>

        <FlatList
          data={transactions}
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
