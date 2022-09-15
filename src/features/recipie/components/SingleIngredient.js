import { SingleIngredientRow } from "./recipe.styles";
import { Feather } from "@expo/vector-icons";
import { Text } from "../../../components/text";
import { View } from "react-native";
import { Spacer } from "../../../components/spacer";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export const SingleIngredient = ({ name, quantity, unit }) => {
  return (
    <SingleIngredientRow>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Feather
          name="shopping-cart"
          size={22}
          color={"#f96163"}
          style={{ padding: 10, backgroundColor: "#f9616312", borderRadius: 5 }}
        />
        <Spacer position="left" size="large" />
        <Text variant="ingredients_item">{capitalizeFirstLetter(name)}</Text>
      </View>
      <Text variant="ingredients_item">
        {quantity} {unit ? unit : "pcs"}
      </Text>
    </SingleIngredientRow>
  );
};
