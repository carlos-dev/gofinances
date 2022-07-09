import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Listagem" component={Dashboard} />
        <Screen name="Cadastrar" component={Register} />
      </Navigator>
    </NavigationContainer>
  );
}