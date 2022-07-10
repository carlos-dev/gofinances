import React from "react";
import { StyleSheet, } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import theme from "../../../global/styles/theme";

import { Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  onPress?: () => void;
}

export function Button({ title, onPress, ...rest }: ButtonProps) {
  return (
    <RectButton onPress={onPress} style={styles.button} {...rest}>
      <Title>{title}</Title>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
    padding: 18,
    alignItems: "center",
  },
});
