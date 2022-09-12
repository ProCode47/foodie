import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../utility/safe-area";
import { Text } from "../../../components/text";
import { Spacer } from "../../../components/spacer";
import { Feather } from "@expo/vector-icons";
import { HeaderRow, RecipeImage, RecipeInfoRow, RecipeInfo } from "../components/recipe.styles";
import { Avatar } from "react-native-paper";
import { ScrollView, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const RecipeScreen = ({ navigation }) => {
  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <HeaderRow>
        <Feather name="chevron-left" size={26} color={"#000"} />
        <Text variant="recipe_header">Recipe</Text>
        <Feather name="more-vertical" size={26} color={"#000"} />
          </HeaderRow>
          <RecipeImage>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={require("./food.jpg")}
          />
          </RecipeImage>
          <Text variant="recipe_title">Garnished Rice and Potatoes</Text>
          <Spacer position="top" size="medium"/>
          <RecipeInfoRow>
              <RecipeInfo>
              <Text variant="recipe_info_value">345</Text>
              <Text variant="recipe_info_text">kcal</Text>
              </RecipeInfo>
              <RecipeInfo>
              <Text variant="recipe_info_value">250</Text>
              <Text variant="recipe_info_text">grams</Text>
              </RecipeInfo>
              <RecipeInfo>
              <Text variant="recipe_info_value">4.5</Text>
              <Text variant="recipe_info_text">rating</Text>
              </RecipeInfo>
              <RecipeInfo>
              <Text variant="recipe_info_value">15</Text>
              <Text variant="recipe_info_text">miutes</Text>
              </RecipeInfo>
              
          </RecipeInfoRow>
    </SafeArea>
  );
};
