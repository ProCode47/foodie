import React, { useEffect, useState, useMemo} from "react";
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

export const HomeScreen = ({ navigation }) => {
  const initialTagState ={
    Chinese: true,
    African: false,
    American: false,
    Italian: false,
    British: false,
    Thai: false,
  }
  const defaultTagState = {
    Chinese: false,
    African: false,
    American: false,
    Italian: false,
    British: false,
    Thai: false,
  }
  const [recipeDisplay, setRecipeDisplay] = useState([]);
  const [tagState, setTagState] = useState(initialTagState);
  const [searchKeyword, setSearchKeyword] = useState("");

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("Chinese", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Chinese");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  const handleTagPress = async (tagname) => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=97a3d35ad8ce4f46a4fcdbdd6d25e69a&cuisine=${tagname}&number=10`
      );
      const data = await api.json();
      // console.log(data.results);
      setRecipeDisplay(data.results);
    } catch (err) {
      console.log(err);
    }

    console.log(tagname);
    const newTagState = { ...defaultTagState }
    newTagState[tagname] = true
    setTagState(newTagState)
    console.log(newTagState)
   
  };
  const getRecipeDisplay = async () => {
    const check = await getData();

    if (check) {
      // console.log(check)
      setRecipeDisplay(check);
    } else {
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=97a3d35ad8ce4f46a4fcdbdd6d25e69a&cuisine=Chinese&number=10`
        );
        const data = await api.json();
        // console.log(data.results);
        setRecipeDisplay(data.results);
        storeData(data.results);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleSearch = async (searchKeyword) => {
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=97a3d35ad8ce4f46a4fcdbdd6d25e69a&query=${searchKeyword}&number=10`
        );
        const data = await api.json();
        // console.log(data.results);
        setRecipeDisplay(data.results);
      } catch (err) {
        console.log(err);
      }
  };


  // const removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem('Chinese')
  //   } catch(e) {
  //     // remove error
  //   }
  
  //   console.log('Done.')
  // }

  useEffect(() => {
    getRecipeDisplay();
  }, []);

  
  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <HeaderRow>
        <WelcomeBar>
          <Text variant="welcomebar_heading"> Hello, Victor 👋</Text>
          <Spacer position="top" />
          <Text variant="welcomebar_caption">
            What do you want to cook today?
          </Text>
        </WelcomeBar>
        <Avatar.Image
          size={52}
          style={{ backgroundColor: "white" }}
          source={require("../../../../assets/avatar.png")}
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
          <Pressable onPress={()=>handleTagPress("Chinese")}>
            <Text variant={tagState.Chinese ? "mealtag_active" :"mealtag"}>Chinese</Text>
          </Pressable>
          <Pressable onPress={()=>handleTagPress("African")}>
            <Text variant={tagState.African ? "mealtag_active" :"mealtag"}>African</Text>
          </Pressable>
          <Pressable onPress={()=>handleTagPress("American")}>
            <Text variant={tagState.American ? "mealtag_active" :"mealtag"}>American</Text>
          </Pressable>
          <Pressable onPress={()=>handleTagPress("Italian")}>
            <Text variant={tagState.Italian ? "mealtag_active" :"mealtag"}>Italian</Text>
          </Pressable>
          <Pressable onPress={()=>handleTagPress("British")}>
            <Text variant={tagState.British ? "mealtag_active" :"mealtag"}>British</Text>
          </Pressable>
          <Pressable onPress={()=>handleTagPress("Thai")}>
            <Text variant={tagState.Thai ? "mealtag_active" :"mealtag"}>Thai</Text>
          </Pressable>
        </MealTagScroll>
      </View>
      <Spacer position="top" size="small" />
      <FlatList
        data={recipeDisplay}
        renderItem={({ item }) => {
          const stringSummary = String(item.summary);
          const stringArray = stringSummary.split("spoonacular score of ")[1];
          const stringArray2 = stringArray?.split("</b>")[0] || "65%";
          const score = Number(stringArray2.match(/\d+/g)[0]);
          const convertedScore = score / 20;
          const displayScore = Math.round(convertedScore * 10) / 10;
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("Recipe", {
                  id: item.id,
                  image: item.image,
                  title: item.title,
                  duration: item.readyInMinutes,
                  servings: item.servings,
                  price: item.pricePerServing,
                  rating: displayScore,
                  tags: item.dishTypes,
                })
              }
            >
              <RecipeItem>
                <ImageBackground
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: item.image }}
                >
                  <LinearGradient
                    colors={["#00000000", "#000000"]}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <View style={{ position: "absolute", top: 25, right: 15 }}>
                      <Text variant="card_rating">
                        <Feather name="star" size={26} color={"#FFF"} />{" "}
                        {displayScore}
                      </Text>
                    </View>
                    <View
                      style={{ position: "absolute", bottom: 15, left: 15 }}
                    >
                      <Text variant="card_heading">{item.title}</Text>
                      <Spacer position="top" size="medium" />
                      <Row>
                        <Feather name="clock" size={18} color={"#FFF"} />
                        <Spacer position="left" size="medium">
                          <Text variant="card_timer">
                            {item.readyInMinutes} min
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
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
