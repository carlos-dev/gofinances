import React from "react";
import { StyleSheet, TouchableOpacity, } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import theme from "../../../global/styles/theme";

import { Title, Container } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  onPress?: () => void;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
