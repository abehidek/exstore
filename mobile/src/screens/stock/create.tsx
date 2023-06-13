import { Button, View } from "react-native";
import { ScreenProps } from "../../../App";

export const CreateStockItemScreen: React.FC<
  ScreenProps<"CreateStockItemScreen">
> = (_) => {
  return (
    <View>
      <Button title="Create" />
    </View>
  );
};
