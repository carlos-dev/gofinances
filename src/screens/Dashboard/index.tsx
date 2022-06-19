import React from 'react';
import { Text, View } from 'react-native';

import { Container, Header, UserInfo, Photo, User, UserWrapper, UserGretting, UserName } from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/31482507?v=4' }} />
            <User>
              <UserGretting>Olá</UserGretting>
              <UserName>Carlos</UserName>
            </User>
          </UserInfo>
        </UserWrapper>
      </Header>
      {/* <Text>pk</Text> */}
    </Container>
  );
}