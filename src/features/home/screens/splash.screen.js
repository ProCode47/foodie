import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../utility/safe-area";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/text";
import { Spacer } from "../../../components/spacer";
import {
  AnimationWrapper,
  SplashContainer,
  SplashButton,
} from "../components/home.styles";
import LottieView from "lottie-react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export const SplashScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/chef.json")}
        />
      </AnimationWrapper>
      <SplashContainer>
        <Text variant="splash_pink">30k+ Premium Recipies</Text>
        <Text variant="splash_heading">Cook like a chef</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <SplashButton><Text variant="splash_button">Get Started</Text></SplashButton>
        </TouchableOpacity>
      </SplashContainer>
    </SafeArea>
  );
};
