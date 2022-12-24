import React, { useState } from "react";
import { SafeArea } from "../../components/safearea";
import { Text } from "../../components/text";
import { Spacer } from "../../components/spacer";
import {
  Search,
  MealTagScroll,
} from "../../components/Home/styles";
import { Avatar } from "react-native-paper";
import { View } from "react-native";
import { Pressable } from "react-native";
import { APP_ID, APP_KEY } from "@env";
import Recipes from "../../components/Recipe";
import { useQuery } from "react-query";
import { HeaderRow, WelcomeBar } from "../../components/Header/styles";

const tags = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian']

export const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([])
  const [tag, setTag] = useState(tags[0])
  const [searchKeyword, setSearchKeyword] = useState("");

  const { isLoading, error, data } = useQuery('getRecipes', async () => {
    const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType=${tags[0]}`).then(res => res.json()).then(data => data.hits).catch(err => console.log(err));
    setRecipes(data);
    return data;
  });

  const handleSearch = async (tagVal) => {
    const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&cuisineType=${tagVal}&q=${searchKeyword}`).then(res => res.json()).then(data => data.hits).catch(err => console.log(err));
    setRecipes(data);
    return data;
  };

  return (
    <SafeArea style={{ backgroundColor: "white" }}>
      <HeaderRow css="padding: 10px;">
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
          source={require("../../../assets/avatarfemale.png")}
        />
      </HeaderRow>
      <Spacer position="top" size="large" />
      <Search
        value={searchKeyword}
        onSubmitEditing={() => handleSearch(tag)}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
      <Spacer position="top" size="medium" />
      <View style={{ flexShrink: 0 }}>
        <MealTagScroll>
          {tags.map((tagVal, idx) =>
            <Pressable onPress={() => {
              setTag(tagVal);
              handleSearch(tagVal)
            }
            } key={idx} >
              <Text variant={tag === tagVal ? "mealtag_active" : "mealtag"}>
                {tagVal}
              </Text>
            </Pressable>
          )}
        </MealTagScroll>
      </View>
      <Spacer position="top" size="small" />
      {data && <Recipes recipes={recipes} navigation={navigation} />}
    </SafeArea >
  );
};
