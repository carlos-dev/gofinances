import React from "react";
import { categories } from "../../utils/categories";

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
  name: string;
  amount: string;
  category: string;
  date: string;
}

export function TransactionCard({ name, amount, category, date, type }: TransactionCardProps) {
  const categoryItem = categories.find(
    item => item.key === category
  );

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        { type === 'negative' && '- ' }
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categoryItem?.icon} />
          <CategoryName>{categoryItem?.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
