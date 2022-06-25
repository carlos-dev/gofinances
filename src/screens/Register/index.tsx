import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Form/Button';

import { Input } from '../../components/Form/Input';

import { Container, Form, Header, Title } from './styles';

export function Register() {
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
        </View>

        <Button title='Enviar' />
      </Form>
    </Container>
  );
}