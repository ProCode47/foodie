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
import { ScrollView, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const HomeScreen = ({ navigation }) => {
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
      <Search />
      <Spacer position="top" size="medium" />
      <View style={{ flexShrink: 0 }}>
        <MealTagScroll>
          <Text variant="mealtag">Breakfast</Text>
          <Text variant="mealtag_active">Lunch</Text>
          <Text variant="mealtag">Dinner</Text>
          <Text variant="mealtag">Brunch</Text>
          <Text variant="mealtag">Snacks</Text>
          <Text variant="mealtag">Desserts</Text>
        </MealTagScroll>
      </View>
      <Spacer position="top" size="small" />
      <ScrollView>
        <RecipeItem>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={require("./food.jpg")}
          >
            <LinearGradient
              colors={["#00000000", "#000000"]}
              style={{ height: "100%", width: "100%" }}
            >
              <View style={{ position: "absolute", top: 25, right: 15 }}>
                <Text variant="card_rating">
                  <Feather name="star" size={26} color={"#FFF"} /> 4.5
                </Text>
              </View>
              <View style={{ position: "absolute", bottom: 15, left: 15 }}>
                <Text variant="card_heading">Garnished Rice and Potatoes</Text>
                <Spacer position="top" size="medium"/>
                <Row>
                  <Feather name="clock" size={18} color={"#FFF"} />
                  <Spacer position="left" size="medium">
                    <Text variant="card_timer">15 min</Text>
                  </Spacer>
                </Row>
              </View>
            </LinearGradient>
          </ImageBackground>
        </RecipeItem>
        <RecipeItem>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={require("./food.jpg")}
          >
            <LinearGradient
              colors={["#00000000", "#000000"]}
              style={{ height: "100%", width: "100%" }}
            >
              <View style={{ position: "absolute", top: 25, right: 15 }}>
                <Text variant="card_rating">
                  <Feather name="star" size={26} color={"#FFF"} /> 4.5
                </Text>
              </View>
              <View style={{ position: "absolute", bottom: 15, left: 15 }}>
                <Text variant="card_heading">Garnished Rice and Potatoes</Text>
                <Spacer position="top" size="medium"/>
                <Row>
                  <Feather name="clock" size={18} color={"#FFF"} />
                  <Spacer position="left" size="medium">
                    <Text variant="card_timer">15 min</Text>
                  </Spacer>
                </Row>
              </View>
            </LinearGradient>
          </ImageBackground>
        </RecipeItem>
        <RecipeItem>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={require("./food.jpg")}
          >
            <LinearGradient
              colors={["#00000000", "#000000"]}
              style={{ height: "100%", width: "100%" }}
            >
              <View style={{ position: "absolute", top: 25, right: 15 }}>
                <Text variant="card_rating">
                  <Feather name="star" size={26} color={"#FFF"} /> 4.5
                </Text>
              </View>
              <View style={{ position: "absolute", bottom: 15, left: 15 }}>
                <Text variant="card_heading">Garnished Rice and Potatoes</Text>
                <Spacer position="top" size="medium"/>
                <Row>
                  <Feather name="clock" size={18} color={"#FFF"} />
                  <Spacer position="left" size="medium">
                    <Text variant="card_timer">15 min</Text>
                  </Spacer>
                </Row>
              </View>
            </LinearGradient>
          </ImageBackground>
        </RecipeItem>
        <RecipeItem>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={require("./food.jpg")}
          >
            <LinearGradient
              colors={["#00000000", "#000000"]}
              style={{ height: "100%", width: "100%" }}
            >
              <View style={{ position: "absolute", top: 25, right: 15 }}>
                <Text variant="card_rating">
                  <Feather name="star" size={26} color={"#FFF"} /> 4.5
                </Text>
              </View>
              <View style={{ position: "absolute", bottom: 15, left: 15 }}>
                <Text variant="card_heading">Garnished Rice and Potatoes</Text>
                <Spacer position="top" size="medium"/>
                <Row>
                  <Feather name="clock" size={18} color={"#FFF"} />
                  <Spacer position="left" size="medium">
                    <Text variant="card_timer">15 min</Text>
                  </Spacer>
                </Row>
              </View>
            </LinearGradient>
          </ImageBackground>
        </RecipeItem>

      </ScrollView>
    </SafeArea>
  );
};
