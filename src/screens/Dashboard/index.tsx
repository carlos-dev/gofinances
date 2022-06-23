import React from "react";

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
  TransacionList
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Dev app",
      amount: "R$ 1100,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      },
      date: "04/04/2020",
    },
    {
      id: '2',
      type: 'negative',
      title: "Lanche",
      amount: "R$ 100,00",
      category: {
        name: "Alimentação",
        icon: "coffee"
      },
      date: "04/04/2020",
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel",
      amount: "R$ 900,00",
      category: {
        name: "Casa",
        icon: "home"
      },
      date: "04/04/2020",
    },
  ]
  
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

        <TransacionList
          data={data}
          keyExtractor={(item: DataListProps) => item.id}
          renderItem={({ item }) => (
            <TransactionCard
              title={item.title}
              type={item.type}
              amount={item.amount}
              category={item.category}
              date={item.date}
            />
          )}
        />
      </Transactions>
    </Container>
  );
}
