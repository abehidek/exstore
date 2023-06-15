import { Button, Text, View, SafeAreaView } from "react-native";
import { ScreenProps } from "../../App";
import { useAuth } from "../auth/AuthContext";
import { AuthScreenLayout } from "../components/AuthScreenLayout";

export const HomeScreen: React.FC<ScreenProps<"HomeScreen">> = ({
  navigation,
}) => {
  return (
    <AuthScreenLayout>
      {(user) => (
        <View>
          <Text>Welcome {user.name}</Text>
        </View>
      )}
    </AuthScreenLayout>
  );
};
