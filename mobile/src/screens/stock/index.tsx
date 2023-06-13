import { Button, View } from "react-native";
import { ScreenProps } from "../../../App";

export const StockItemsScreen: React.FC<ScreenProps<"StockItemsScreen">> = (
  props
) => {
  return (
    <View>
      <Button
        title="Create new product"
        onPress={() => props.navigation.navigate("CreateStockItemScreen")}
      />
    </View>
  );
};
