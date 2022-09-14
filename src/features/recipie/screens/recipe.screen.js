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
  IngredientRow,
} from "../components/recipe.styles";
import { Avatar } from "react-native-paper";
import { ScrollView, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SingleIngredient } from "../components/SingleIngredient";

export const RecipeScreen = ({ route, navigation }) => {
  const [recipeObject, setRecipeObject] = useState({});
  useEffect(() => {
    // console.log(route.params.isbn);
    const { id, image, title, summary } = route.params;
    // console.log(route.params)
    setRecipeObject({ id, image, title, summary });

    // fetch(
    //   `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_API_KEY}`
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     // console.log(res.items[0]);
    //     setBook(res.items[0]);
    //   })
    //   .catch(console.error);
  }, [route]);
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
            source={{ uri: recipeObject.image }}
          />
        </RecipeImage>
        <Text variant="recipe_title">{recipeObject.title}</Text>
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
        <Text variant="recipe_summary">{recipeObject.summary}</Text>
        <IngredientRow>
          <Text variant="ingredients_header">Ingredients</Text>
          <Text variant="ingredients_header_quantity">6 Items</Text>
        </IngredientRow>
        <ScrollView>
          <SingleIngredient name="Eggs" quantity="3" />
          <SingleIngredient name="Bacon" quantity="5" />
          <SingleIngredient name="Pepper" quantity="7" />
        </ScrollView>
      </ScrollView>
    </SafeArea>
  );
};
