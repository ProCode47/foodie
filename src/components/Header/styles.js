import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;

// padding: 10px 10px 0px 10px;
export const HeaderRow = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  alignItems: center;
  ${props => props.css}
`;
export const WelcomeBar = styled.View`
  flex-direction: column;
  width: ${DEVICE_WIDTH - 70}px
`;