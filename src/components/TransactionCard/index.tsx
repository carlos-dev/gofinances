import React from "react";
import { createGlobalStyle } from "styled-components";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
}

export function TransactionCard({ title, amount, category, date, type }: TransactionCardProps) {
  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>
        { type === 'negative' && '- ' }
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
