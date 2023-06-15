import { SafeAreaView, View, Text } from "react-native";
import { useAuth } from "../auth/AuthContext";
import { User } from "../__gql__/graphql";

export const AuthScreenLayout: React.FC<{
  children: (user: User) => React.ReactNode;
}> = (props) => {
  const { user, error, loading } = useAuth();

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (error.result || !user)
    return (
      <View>
        <Text>Something wrong happened</Text>
      </View>
    );

  return (
    <SafeAreaView className="bg-grey-100 h-screen flex items-center p-5 w-full overflow-hidden">
      {props.children(user)}
    </SafeAreaView>
  );
};
