import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ScreenProps } from "../../App";

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

export const SignInScreen: React.FC<ScreenProps<"SignIn">> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.tsx to start working on your app!!!</Text>
    </SafeAreaView>
  );
};
