import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

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
  LoadContainer,
} from "./styles";
import theme from "../../global/styles/theme";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightCardData {
  amount: string;
  lastTransaction: string;
}

interface HighlightCardProps {
  entries: HighlightCardData;
  expensive: HighlightCardData;
  total: HighlightCardData;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightCard, setHighlightCard] = useState<HighlightCardProps>(
    {} as HighlightCardProps
  );

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const lastTransaction = collection
      .filter((transaction) => transaction.type === type)
      .map((transaction) => new Date(transaction.date).getTime());

    const highestTransactionDate = new Date(
      Math.max.apply(Math, lastTransaction)
    );
    const lastTransactionFormatted = `${highestTransactionDate.getDate()} de ${highestTransactionDate.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;

    return lastTransactionFormatted;
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsResponse = response ? JSON.parse(response) : [];
    const transactionsFormatted: DataListProps[] = transactionsResponse.map(
      (transaction: DataListProps) => {
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
        };
      }
    );

    const total = entriesTotal - expensiveTotal;

    const lastTransactionEntries = getLastTransactionDate(
      transactionsResponse,
      "positive"
    );
    const lastTransactionExpensives = getLastTransactionDate(
      transactionsResponse,
      "negative"
    );
    const totalInterval = `01 a ${lastTransactionEntries}`;

    setTransactions(transactionsFormatted);
    setHighlightCard({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
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
              lastTransaction={highlightCard.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Total de Despesas"
              amount={highlightCard.expensive.amount}
              lastTransaction={highlightCard.expensive.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Saldo"
              amount={highlightCard.total.amount}
              lastTransaction={highlightCard.total.lastTransaction}
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
        </>
      )}
    </Container>
  );
}
