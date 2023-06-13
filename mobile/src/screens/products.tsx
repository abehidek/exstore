import { ScreenProps } from "../../App";
import { StyleSheet, Text, SafeAreaView } from "react-native";

const white = "#fff";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: white,
    display: "flex",
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
});

export const ProductsPage: React.FC<ScreenProps<"Products">> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Products</Text>
    </SafeAreaView>
  );
};
