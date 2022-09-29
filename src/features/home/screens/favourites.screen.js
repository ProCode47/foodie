import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../utility/safe-area";
import { Text } from "../../../components/text";
import { Spacer } from "../../../components/spacer";
import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import {
  HeaderRow,
  WelcomeBar,
  Search,
  RecipeItem,
  MealTagScroll,
  Row,
  BackDrop,
} from "../components/home.styles";
import { Avatar } from "react-native-paper";
import { ScrollView, View, ImageBackground, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_ID, APP_KEY } from "@env";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const FavouriteScreen = ({ navigation, route }) => {
  const [recipeDisplay, setRecipeDisplay] = useState([]);
  const [existingFavourites, setExistingFavourites] = useState(false);
  const isFocused = useIsFocused();

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const storeData = async (value, location) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(location, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async (location) => {
    try {
      const jsonValue = await AsyncStorage.getItem(location);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  const getRecipeDisplay = async () => {
    const check = await getData("Favourites");
    if (check) {
      // const uniqueArray = getUniqueListBy(arr, "_links.self.href");
      // setRecipeDisplay(uniqueArray);
      setRecipeDisplay(check);
      setExistingFavourites(true);
    } else {
      setExistingFavourites(false);
    }
  };

  const handleFavourite = async (link) => {
    const updatedArray = recipeDisplay.filter((item) => item._links.self.href !== link);
    setRecipeDisplay(updatedArray)
  };

  useEffect(() => {
    getRecipeDisplay();
  }, [isFocused]);

  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <HeaderRow>
        <Feather name="chevron-left" size={26} color={"#000"} />
        <Text variant="recipe_header">Favourites</Text>
        <Feather name="more-vertical" size={26} color={"#FFF"} />
      </HeaderRow>
      <Spacer position="top" size="large" />
      {existingFavourites ? (
        <FlatList
          data={recipeDisplay}
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
                      <View
                        style={{ position: "absolute", top: 25, right: 15 }}
                      >
                        <Feather
                          onPress={() => handleFavourite(item._links.self.href)}
                          name="heart"
                          size={24}
                          color={"red"}
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
          keyExtractor={(item) => item.recipe.label}
        />
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
