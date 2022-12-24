import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { HomeScreen } from "../screens/Tab/Home";
import { FavouriteScreen } from "../screens/Tab/Favourite";
import { RecipeScreen } from "../screens/Tab/Recipe";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Recipe: "list",
  Favourite: "heart",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarActiveTintColor: colors.brand.primary,
    tabBarInactiveTintColor: colors.brand.muted,
    tabBarIcon: ({ size, color }) => (
      <Feather name={iconName} size={size} color={color} />
    ),
    headerShown: false,
    tabBarStyle: [
      {
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
      },
      null,
    ],
    tabBarLabelStyle: {
      fontSize: 15,
    },
  };
};

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={createScreenOptions}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Recipe" component={RecipeScreen} />
    <Tab.Screen name="Favourite" component={FavouriteScreen} options={{ unmountOnBlur: true }} />
  </Tab.Navigator>
);
