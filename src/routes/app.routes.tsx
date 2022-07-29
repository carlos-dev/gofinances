import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator,} from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { Register } from "../screens/Register";
import { Dashboard } from "../screens/Dashboard";
import { Resume } from "../screens/Resume";
import theme from "../global/styles/theme";

const { Navigator, Screen } = createBottomTabNavigator();

export type RootStackParamList = {
  Listagem: undefined;
  Cadastrar: undefined;
  Resumo: undefined;
};

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.secondary,
          tabBarInactiveTintColor: theme.colors.text,
          tabBarLabelPosition: "beside-icon",
          tabBarStyle: {
            paddingVertical: Platform.OS === "ios" ? 20 : 0,
            height: 68
          }
        }}
      >
        <Screen
          name="Listagem"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="format-list-bulleted"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Screen
          name="Cadastrar"
          component={Register}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="attach-money"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Screen
          name="Resumo"
          component={Resume}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="pie-chart"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
