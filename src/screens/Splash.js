import React from "react";
import { SafeArea } from "../components/safearea";
import { Text } from "../components/text";
import {
  AnimationWrapper,
  SplashContainer,
  SplashButton,
} from "../components/Home/styles";
import LottieView from "lottie-react-native";
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
          source={require("../../assets/chef.json")}
        />
      </AnimationWrapper>
      <SplashContainer>
        <Text variant="splash_pink">30k+ Premium Recipies</Text>
        <Text variant="splash_heading">Cook like a chef</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
          <SplashButton><Text variant="splash_button">Get Started</Text></SplashButton>
        </TouchableOpacity>
      </SplashContainer>
    </SafeArea>
  );
};
