import React, { FC } from "react";
import { Text, View } from "react-native";

import { HighlightCard } from "../../components/HighlightCard";

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
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>
    </Container>
  );
}
