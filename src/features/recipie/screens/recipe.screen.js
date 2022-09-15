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
  TagRow,
} from "../components/recipe.styles";
import { ScrollView, View, ImageBackground, FlatList } from "react-native";
import { SingleIngredient } from "../components/SingleIngredient";

export const RecipeScreen = ({ route, navigation }) => {
  const fallbackState = {
    id: "663313",
    image: "https://spoonacular.com/recipeImages/663313-556x370.jpg",
    title: "The Pearhattan Cocktail",
    rating: "4.5",
    duration: "90",
    servings: "2",
    price: "45",
    tags: ["Breakfast", "Fast", "Easy"],
  };
  const [recipeObject, setRecipeObject] = useState({});
  const [details, setDetails] = useState({});

  useEffect(() => {
    // console.log(route.params);
    if (route.params) {
      const { id, image, title, rating, duration, servings, price, tags } =
        route.params;
      setRecipeObject({
        id,
        image,
        title,
        rating,
        duration,
        servings,
        price,
        tags,
      });
    } else {
      setRecipeObject(fallbackState);
    }
  }, [route]);

  useEffect(() => {
    try {
      const fetchDetails = async () => {
        const data = await fetch(
          `https://api.spoonacular.com/recipes/${recipeObject.id}/information?apiKey=97a3d35ad8ce4f46a4fcdbdd6d25e69a`
        );
        const detailData = await data.json();
        setDetails(detailData?.extendedIngredients);
        // console.log(detailData);
      };
      fetchDetails();
    } catch (err) {
      console.log({ err });
    }
  }, [recipeObject.id]);

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
            <Text variant="recipe_info_value">{recipeObject.servings}</Text>
            <Text variant="recipe_info_text">servings</Text>
          </RecipeInfo>
          <RecipeInfo>
            <Text variant="recipe_info_value">${recipeObject.price}</Text>
            <Text variant="recipe_info_text">price</Text>
          </RecipeInfo>
          <RecipeInfo>
            <Text variant="recipe_info_value">{recipeObject.rating}</Text>
            <Text variant="recipe_info_text">rating</Text>
          </RecipeInfo>
          <RecipeInfo>
            <Text variant="recipe_info_value">{recipeObject.duration}</Text>
            <Text variant="recipe_info_text">miutes</Text>
          </RecipeInfo>
        </RecipeInfoRow>
        <View style={{padding:15}}>
          <ScrollView horizontal={true}>
            {recipeObject.tags.map((tag) => {
              return <Text variant="mealtag_active">{tag}</Text>;
            })}
          </ScrollView>
        </View>
        <IngredientRow>
          <Text variant="ingredients_header">Ingredients</Text>
          <Text variant="ingredients_header_quantity">
            {details.length} Items
          </Text>
        </IngredientRow>
        <FlatList
          data={details}
          renderItem={({ item }) => {
            return (
              <SingleIngredient
                name={item.nameClean}
                quantity={item.amount}
                unit={item.unit}
              />
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </ScrollView>
    </SafeArea>
  );
};
