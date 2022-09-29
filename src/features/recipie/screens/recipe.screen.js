import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../utility/safe-area";
import { Text } from "../../../components/text";
import { Spacer } from "../../../components/spacer";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  HeaderRow,
  RecipeImage,
  RecipeInfoRow,
  RecipeInfo,
  IngredientRow,
  TagRow,
} from "../components/recipe.styles";
import { ScrollView, View, ImageBackground, FlatList } from "react-native";
import { SingleIngredient } from "../components/SingleIngredient";

export const RecipeScreen = ({ route, navigation }) => {
  const [recipeObject, setRecipeObject] = useState({});
  const [existingRecipe, setExistingRecipe] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    // console.log(route.params);
    if (route.params) {
      const { image, title, calories, servings, weight, tags, ingredients } =
        route.params;
      
      console.log(ingredients)
      setRecipeObject({
        image,
        title,
        calories,
        servings,
        weight,
        tags,
      });
      setDetails(ingredients);
      setExistingRecipe(true)
    } else {
      setExistingRecipe(false)
    }
  }, [route]);

  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <HeaderRow>
        <Feather name="chevron-left" size={26} color={"#000"} />
        <Text variant="recipe_header">Recipe</Text>
        <Feather name="more-vertical" size={26} color={"#000"} />
      </HeaderRow>
   { existingRecipe ?  <ScrollView>
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
            <Text variant="recipe_info_value">{recipeObject.servings}</Text>
            <Text variant="recipe_info_text">servings</Text>
          </RecipeInfo>
          <RecipeInfo>
            <Text variant="recipe_info_value">{recipeObject.calories}</Text>
            <Text variant="recipe_info_text">kcal</Text>
          </RecipeInfo>
          <RecipeInfo>
            <Text variant="recipe_info_value">{recipeObject.weight}</Text>
            <Text variant="recipe_info_text">grams</Text>
          </RecipeInfo>
        </RecipeInfoRow>
        <View style={{ padding: 15 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {recipeObject?.tags?.map((tag) => {
              return <Text variant="mealtag_active">{tag}</Text>;
            })}
          </ScrollView>
        </View>
        <IngredientRow>
          <Text variant="ingredients_header">Ingredients</Text>
          <Text variant="ingredients_header_quantity">
            {details?.length} Items
          </Text>
        </IngredientRow>
        <FlatList
          data={details}
          renderItem={({ item }) => {
            return (
              <SingleIngredient
                name={item.food}
                quantity={item.quantity}
                unit={item.measure}
              />
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </ScrollView> : <View style={{ flex: 1,justifyContent:"center", alignItems:"center"}}><Text variant="ingredients_item">Click a recipe to view it!</Text></View>}
    </SafeArea>
  );
};
