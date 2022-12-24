import React from "react";
import { SafeArea } from "../../components/safearea";
import { Text } from "../../components/text";
import { Spacer } from "../../components/spacer";
import { Feather } from "@expo/vector-icons";
import {
  RecipeImage,
  RecipeInfoRow,
  RecipeInfo,
  IngredientRow,
  SingleIngredientRow,
} from "../../components/Recipe/styles";
import { ScrollView, View, ImageBackground, FlatList } from "react-native";
import { HeaderRow } from "../../components/Header/styles";

export const RecipeScreen = ({ route, navigation }) => {
  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <HeaderRow>
        <Feather name="chevron-left" size={26} color={"#000"} onPress={() => navigation.navigate('Home')} />
        <Text variant="recipe_header">Recipe</Text>
        <Feather name="more-vertical" size={26} color={"#FFF"} />
      </HeaderRow>
      {route.params ? <ScrollView>
        <RecipeImage>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={{ uri: route.params.image }}
          />
        </RecipeImage>
        <Text variant="recipe_title">{route.params.title}</Text>
        <Spacer position="top" size="medium" />
        <RecipeInfoRow>
          <RecipeInfo>
            <Text variant="recipe_info_value">{route.params.servings}</Text>
            <Text variant="recipe_info_text">servings</Text>
          </RecipeInfo>
          <RecipeInfo>
            <Text variant="recipe_info_value">{route.params.calories}</Text>
            <Text variant="recipe_info_text">kcal</Text>
          </RecipeInfo>
          <RecipeInfo>
            <Text variant="recipe_info_value">{route.params.weight}</Text>
            <Text variant="recipe_info_text">grams</Text>
          </RecipeInfo>
        </RecipeInfoRow>
        <View style={{ padding: 15 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {route.params?.tags?.map((tag, idx) => {
              return <Text variant="mealtag_active" key={idx}>{tag}</Text>;
            })}
          </ScrollView>
        </View>
        <IngredientRow>
          <Text variant="ingredients_header">Ingredients</Text>
          <Text variant="ingredients_header_quantity">
            {route.params.ingredients?.length} Items
          </Text>
        </IngredientRow>
        {route.params.ingredients?.map((item, idx) => {
          return (
            <SingleIngredientRow key={idx}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather
                  name="shopping-cart"
                  size={22}
                  color={"#f96163"}
                  style={{ padding: 10, backgroundColor: "#f9616312", borderRadius: 5 }}
                />
                <Spacer position="left" size="large" />
                <Text variant="ingredients_item">{item.food.charAt(0).toUpperCase() + item.food.slice(1)}</Text>
              </View>
              <Text variant="ingredients_item">
                {Math.round(item.quantity * 10) / 10} {item.measure === "<unit>" ? "pcs" : item.measure}
              </Text>
            </SingleIngredientRow>
          )
        })}
      </ScrollView> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text variant="ingredients_item">Click a recipe to view it!</Text></View>}
    </SafeArea>
  );
};
