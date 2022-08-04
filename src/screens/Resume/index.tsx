import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import { Container, Content, Header, Title } from './styles';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
  percent: number;
  percentFormatted: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>();
  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'negative');
    const expensiveTotal = expensives.reduce((acc: number, current: TransactionData) => {
      return acc + Number(current.amount);
    }, 0);
    
    const totalByCategory: CategoryData[] = []
    categories.forEach((category: any) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      })
      const percent = (categorySum / expensiveTotal * 100)
      const percentFormatted = percent.toFixed(0) + '%'
      
      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
          percent,
          percentFormatted,
        })
      }
    })

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories?.map((category: CategoryData) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
}