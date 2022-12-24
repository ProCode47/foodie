import React, { memo } from 'react'
import { FlatList, ImageBackground, Pressable, View } from 'react-native';
import { RecipeItem, Row } from '../Home/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../text';
import { Spacer } from '../spacer';
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';

// use React.Memo to watch rerender
const Recipes = ({ recipes, navigation }) => {
  const favRecipe = useSelector(state => state.recipe.favourites);
  const dispatch = useDispatch();

  const favLabels = favRecipe.map(data => data.recipe.label);

  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("Recipe", {
                image: item.recipe.image,
                title: item.recipe.label,
                servings: item.recipe.yield,
                calories: Math.floor(item.recipe.calories),
                weight: Math.floor(item.recipe.totalWeight),
                tags: [...item.recipe.mealType, ...item.recipe.dishType],
                ingredients: item.recipe.ingredients,
              })
            }
          >
            <RecipeItem>
              <ImageBackground
                style={{ width: "100%", height: "100%" }}
                source={{ uri: item.recipe.image }}
              >
                <LinearGradient
                  colors={["#00000000", "#000000"]}
                  style={{ height: "100%", width: "100%" }}
                >
                  <View style={{ position: "absolute", top: 25, right: 25 }}>
                    <Feather
                      onPress={() => dispatch({ type: "recipe/handleFavourite", payload: item })}
                      name="heart"
                      size={24}
                      color={favLabels.find(label => label === item.recipe.label) ? "#F00" : "#FFF"}
                    />
                  </View>
                  <View
                    style={{ position: "absolute", bottom: 15, left: 15 }}
                  >
                    <Text variant="card_heading">{item.recipe.label}</Text>
                    <Spacer position="top" size="large" />
                    <Row>
                      <MaterialCommunityIcons
                        name="silverware-fork-knife"
                        size={20}
                        color={"#FFF"}
                      />
                      <Spacer position="left" size="medium">
                        <Text variant="card_timer">
                          {Math.floor(item.recipe.calories)} kcal
                        </Text>
                      </Spacer>
                    </Row>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </RecipeItem>
          </Pressable>
        );
      }}
    // keyExtractor={(item) => item.recipe.label}
    />
  )
}

export default memo(Recipes);