import { ScreenProps } from "../../App";
import { Text, SafeAreaView } from "react-native";

export const ProductsPage: React.FC<ScreenProps<"Products">> = () => {
  return (
    <SafeAreaView className="bg-grey-100 h-screen flex items-center justify-center">
      <Text>Products</Text>
    </SafeAreaView>
  );
};
