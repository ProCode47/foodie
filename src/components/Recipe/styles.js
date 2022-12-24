import styled from "styled-components/native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../Header/styles";

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

export const RecipeImage = styled.View`
  width: ${(90 / 100) * DEVICE_WIDTH}px;
  height: ${(30 / 100) * DEVICE_HEIGHT}px;
  margin: 10px auto;
  border-radius: 20px;
  overflow: hidden;
  elevation: 1;
`;

export const RecipeInfoRow = styled.View`
  align-items: center;
  padding: 20px;
  border: 1px solid #EEEEEE;
  border-radius: 15px;
  flex-direction:row;
  justify-content:space-between;
  width: ${(90 / 100) * DEVICE_WIDTH}px;
  margin: 0 auto;

`;

export const RecipeInfo = styled.View`
  align-items: center;
`;

export const IngredientRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #EEEEEE;
`;

export const SingleIngredientRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

export const TagRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
`;