import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../utility/safe-area";
import { Text } from "../../../components/text";
import { Spacer } from "../../../components/spacer";
import { Feather } from "@expo/vector-icons";
import {
  HeaderRow,
  RecipeImage,
  RecipeInfoRow,
  RecipeInfo,
} from "../components/recipe.styles";
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
      <ScrollView>
        <RecipeImage>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={require("./food.jpg")}
          />
        </RecipeImage>
        <Text variant="recipe_title">Garnished Rice and Potatoes</Text>
        <Spacer position="top" size="medium" />
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
        <Text variant="recipe_summary">
          The recipe Crepes Suzette could satisfy your Mediterranean craving in
          approximately 45 minutes. For 86 cents per serving, you get a morn
          meal that serves 4. One serving contains 613 calories, 11g of protein,
          and 39g of fat. A couple people made this recipe, and 45 would say it
          hit the spot. It is a good option if you're following a vegetarian
          diet. A mixture of butter, salt, water, and a handful of other
          ingredients are all it takes to make this recipe so delicious. All
          things considered, we decided this recipe deserves a spoonacular score
          of 46%. This score is solid.
        </Text>
      </ScrollView>
    </SafeArea>
  );
};
