import { Button, Text, View, SafeAreaView } from "react-native";
import { ScreenProps } from "../../App";
import { useAuth } from "../auth/AuthContext";

export const HomeScreen: React.FC<ScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  const { user } = useAuth();

  return (
    <SafeAreaView className="bg-grey-100 h-screen flex items-center justify-center">
      <View>
        <Text>{JSON.stringify(user)}</Text>
      </View>
    </SafeAreaView>
  );
};
