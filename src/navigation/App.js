import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "../screens/Splash";
import { TabNavigator } from "./Tab";
import { Provider } from "react-redux";
import store from "../store";
import { QueryClient, QueryClientProvider } from "react-query";

const Stack = createStackNavigator();

const queryClient = new QueryClient()

export const AppNavigator = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  </Provider>
);
