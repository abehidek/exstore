import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import { ScreenProps } from "../../App";
import { OptionalAuthLayout } from "../components/OptionalAuthLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        {({ user, refetch }) => (
          <View>
            <Button title="Refetch data" onPress={() => refetch()} />
            {user ? (
              <View>
                <Text>User session: {JSON.stringify(user)}</Text>
                <Button
                  onPress={async () => {
                    AsyncStorage.removeItem("@token").then(() => {
                      refetch();
                      Alert.alert("Signed off");
                    });
                  }}
                  title="Sign out!"
                />
              </View>
            ) : (
              <View>
                <Text>No user session found</Text>
                <Button
                  onPress={() => navigation.navigate("SignIn")}
                  title="Sign in here!"
                />
              </View>
            )}
          </View>
        )}
      </OptionalAuthLayout>
    </SafeAreaView>
  );
};
