import React from 'react';
import { View } from 'react-native';

import { Container, Title, Amount, Footer, Category, Icon, CategoryName, Date } from './styles';

export function TransactionCard() {
  return (
    <Container>
      <Title>Dev app</Title>

      <Amount>R$ 1000.00</Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>vendas</CategoryName>
        </Category>

        <Date>12/12/2020</Date>
      </Footer>
    </Container>
  );
}