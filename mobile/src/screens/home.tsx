import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ScreenProps } from "../../App";
import { OptionalAuthLayout } from "../components/OptionalAuthLayout";

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

export const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.tsx to start working on your app!!!</Text>
      <OptionalAuthLayout>
        {({ user }) => {
          if (!user) return <Text>No user session found</Text>;

          return <Text>User session: {JSON.stringify(user)}</Text>;
        }}
      </OptionalAuthLayout>
      <Button
        onPress={() => navigation.navigate("SignIn")}
        title="Sign in here!"
      />
    </SafeAreaView>
  );
};
