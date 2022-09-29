import React, { useEffect, useState } from "react";
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


export const HomeScreen = ({ navigation }) => {

  const initialTagState = {
    Japanese: true,
    French: false,
    American: false,
    Italian: false,
    British: false,
    Indian: false,
  };
  const defaultTagState = {
    Japanese: false,
    French: false,
    American: false,
    Italian: false,
    British: false,
    Indian: false,
  };
  const [recipeDisplay, setRecipeDisplay] = useState([]);
  const [tagState, setTagState] = useState(initialTagState);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  const handleTagPress = async (tagname) => {
    const newTagState = { ...defaultTagState };
    newTagState[tagname] = true;
    setTagState(newTagState);
    setRecipeDisplay([]);
    try {
      const api = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType=${tagname}`
      );
      const data = await api.json();
      // console.log(data.results);
      setRecipeDisplay(data.hits);
    } catch (err) {
      console.log(err);
    }
  };
  const getRecipeDisplay = async () => {
    const check = await getData("Cache");

    if (check) {
      // console.log(check)
      setRecipeDisplay(check);
    } else {
      try {
        const api = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType=Japanese`
        );
        const data = await api.json();
        // console.log(data.results);
        setRecipeDisplay(data.hits);
        await storeData(data.hits, "Cache");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSearch = async (searchKeyword) => {
    setRecipeDisplay([]);
    try {
      const api = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchKeyword}`
      );
      const data = await api.json();
      // console.log(data.results);
      setRecipeDisplay(data.hits);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFavourite = async (link) => {
    try {
      const api = await fetch(`${link}`);
      const data = await api.json();
      const favourites = await getData("Favourites");
      if (favourites === null) {
        const updatedFavourites = [data];
        await storeData(updatedFavourites, "Favourites");
      }
      const updatedFavourites = [...favourites, data];
      await storeData(updatedFavourites, "Favourites");
    } catch (err) {
      console.log(err);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("Favourites");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  useEffect(() => {
    removeValue()
    getRecipeDisplay();
  }, []);

  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <HeaderRow>
        <WelcomeBar>
          <Text variant="welcomebar_heading">Hello there 👋</Text>
          <Spacer position="top" />
          <Text variant="welcomebar_caption">
            What do you want to cook today?
          </Text>
        </WelcomeBar>
        <Avatar.Image
          size={50}
          style={{ backgroundColor: "#f9616300" }}
          source={require("../../../../assets/avatarfemale.png")}
        />
      </HeaderRow>
      <Spacer position="top" size="large" />
      <Search
        value={searchKeyword}
        onSubmitEditing={() => {
          handleSearch(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
      <Spacer position="top" size="medium" />
      <View style={{ flexShrink: 0 }}>
        <MealTagScroll>
          <Pressable onPress={() => handleTagPress("Japanese")}>
            <Text variant={tagState.Japanese ? "mealtag_active" : "mealtag"}>
              Japanese
            </Text>
          </Pressable>
          <Pressable onPress={() => handleTagPress("French")}>
            <Text variant={tagState.French ? "mealtag_active" : "mealtag"}>
              French
            </Text>
          </Pressable>
          <Pressable onPress={() => handleTagPress("American")}>
            <Text variant={tagState.American ? "mealtag_active" : "mealtag"}>
              American
            </Text>
          </Pressable>
          <Pressable onPress={() => handleTagPress("Italian")}>
            <Text variant={tagState.Italian ? "mealtag_active" : "mealtag"}>
              Italian
            </Text>
          </Pressable>
          <Pressable onPress={() => handleTagPress("British")}>
            <Text variant={tagState.British ? "mealtag_active" : "mealtag"}>
              British
            </Text>
          </Pressable>
          <Pressable onPress={() => handleTagPress("Indian")}>
            <Text variant={tagState.Indian ? "mealtag_active" : "mealtag"}>
              Indian
            </Text>
          </Pressable>
        </MealTagScroll>
      </View>
      <Spacer position="top" size="small" />
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
                    <View style={{ position: "absolute", top: 25, right: 15 }}>
                      <Feather
                        onPress={() => handleFavourite(item._links.self.href)}
                        name="heart"
                        size={24}
                        color={"#FFF"}
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
    </SafeArea>
  );
};
