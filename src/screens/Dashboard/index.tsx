import React, { FC } from "react";
import { Text, View } from "react-native";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

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
  Title
} from "./styles";

export function Dashboard() {
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

        <TransactionCard />
      </Transactions>
    </Container>
  );
}
