import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ScreenProps } from "../../App";
import { useAuth } from "../auth/AuthContext";

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
  const { signOut, user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text>{JSON.stringify(user)}</Text>

      <View>
        <Button
          onPress={() => {
            signOut();
          }}
          title="Sign out!"
        />
      </View>

      <Button
        onPress={() => navigation.navigate("Products")}
        title="Products Page"
      />
    </SafeAreaView>
  );
};
