import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { Searchbar } from "react-native-paper";
import { ScrollView } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../Header/styles";

export const Header = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 60px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const MenuIcon = styled(Feather).attrs({
  name: "menu",
  size: 20,
  color: colors.brand.primary,
})``;
export const AnimationWrapper = styled.View`
  width: 100%;
  height: 55%;
  padding: ${(props) => props.theme.space[2]};
  `;
export const SplashContainer = styled.View`
  width: 100%;
  height: 45%;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

export const SplashButton = styled.View`
  height: 60px;
  width: 180px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: #f96163;
  border-radius: 40px;
`;

export const HeaderRow = styled.View`
  padding: 10px 10px 0px 10px;
  flex-direction: row;
  justify-content: space-between;
  alignItems: center;
  overflow: hidden;
`;
export const WelcomeBar = styled.View`
  flex-direction: column;
  width: ${DEVICE_WIDTH - 70}px
`;
export const Search = styled(Searchbar).attrs({
  placeholder: "Search for recipes",
  placeholderTextColor: "#CDCDCD",
  iconColor: "#CDCDCD",
  selectionColor: colors.brand.primary,
  theme: { colors: { text: "#131313" } },
})`
  width: 90%;
  margin: 0 auto;
  background-color: #f3f3f3;
  border-radius: 10px;
  color: red;
`;
export const MealTagScroll = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  padding: 10px;
`;
export const RecipeItem = styled.View`
  width: ${(95 / 100) * DEVICE_WIDTH}px;
  height: ${(35 / 100) * DEVICE_HEIGHT}px;
  background-color: grey;
  margin: 0 auto;
  margin-bottom: 15px;
  border-radius: 20px;
  overflow:hidden;
  elevation:1;
`;
export const RecipeImage = styled.Image`
width:100%;
height:100%;
elevation:10;
`;
export const BackDrop = styled.View`
width:100%;
height:100%;
background-color:#13131355;
position: relative;
`
export const Row = styled.View`
flex-direction:row;
align-items:center;
`