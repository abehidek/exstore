import { Button, Text, View, SafeAreaView } from "react-native";
import { ScreenProps } from "../../App";
import { useAuth } from "../auth/AuthContext";

export const HomeScreen: React.FC<ScreenProps<"Home">> = ({ navigation }) => {
  const { signOut, user } = useAuth();

  return (
    <SafeAreaView className="bg-grey-100 h-screen flex items-center justify-center">
      <View>
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
      </View>
    </SafeAreaView>
  );
};
