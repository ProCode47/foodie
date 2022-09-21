import React, { useEffect, useState, useMemo } from "react";
import { SafeArea } from "../../../utility/safe-area";
import { Text } from "../../../components/text";
import { Spacer } from "../../../components/spacer";
import { Feather } from "@expo/vector-icons";
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
    const [existingFavourites, setsetExistingFavourites] = useState(false);

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
        console.log("Damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        console.log("Damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        console.log("Damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        console.log("Damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        console.log("Damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        console.log("Damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        console.log("Damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
      console.log(check)
        setRecipeDisplay(check);
        setExistingFavourites(true)

    } else {
      setExistingFavourites(false)
    }
  };

  const handleFavourite = async (link) => {
    try {
      const api = await fetch(
        `${link}`
      );
      const data = await api.json();
      const favourites = getData("Favourites")
      const updatedFavourites = [...favourites,data]
      storeData(updatedFavourites, "Favourites");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecipeDisplay();
  }, [route]);

  return (
    <SafeArea style={{ backgroundColor: "white" }}>
           <HeaderRow>
        <Feather name="chevron-left" size={26} color={"#000"} />
        <Text variant="recipe_header">Favourites</Text>
        <Feather name="more-vertical" size={26} color={"#000"} />
      </HeaderRow>
      <Spacer position="top" size="large" />
     { existingFavourites ? <FlatList
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
                    <View style={{ position: "absolute", top: 25, right: 15 }}>
                      <Feather onPress={()=> handleFavourite(item._links.self.href)} name="heart" size={24} color={"#FFF"} />
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
      /> : <Text> No Favourites added yet! </Text>}
    </SafeArea>
  );
};
