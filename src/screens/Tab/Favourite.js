import React from "react";
import { SafeArea } from "../../components/safearea";
import { Text } from "../../components/text";
import { Spacer } from "../../components/spacer";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Recipes from "../../components/Recipe";
import { HeaderRow } from "../../components/Header/styles";

export const FavouriteScreen = ({ navigation }) => {
  const favRecipe = useSelector(state => state.recipe.favourites);

  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <HeaderRow>
        <Feather name="chevron-left" size={26} color={"#000"} onPress={() => navigation.navigate('Home')} />
        <Text variant="recipe_header">Favourites</Text>
        <Feather name="more-vertical" size={26} color={"#FFF"} />
      </HeaderRow>
      <Spacer position="top" size="large" />
      {favRecipe && favRecipe.length >= 1 ? (
        <Recipes recipes={favRecipe} navigation={navigation} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text variant="ingredients_item">No Favourites added yet!</Text>
        </View>
      )}
    </SafeArea>
  );
};
