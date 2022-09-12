import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "../../features/home/screens/splash.screen";
import { Text } from "../../components/text";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { HomeNavigator } from "./home.navigator";

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} headerMode="none">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);
