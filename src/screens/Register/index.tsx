import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Form/Button';

import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { Container, Form, Header, Title, TransactionsTypes } from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypesSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <View>
          <Input
            placeholder='Nome'
          />
          <Input
            placeholder='Preço'
          />
          <TransactionsTypes>
            <TransactionTypeButton 
              type='up'
              title='income'
              onPress={() => handleTransactionsTypesSelect('up')}
              isActive={transactionType === 'up'}
            />
            
            <TransactionTypeButton 
              type='down'
              title='outome'
              onPress={() => handleTransactionsTypesSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>
        </View>

        <Button title='Enviar' />
      </Form>
    </Container>
  );
}