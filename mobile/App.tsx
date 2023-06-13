import { HomeScreen } from "./src/screens/home";
import { client } from "./src/client";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "./src/screens/signin";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProductsPage } from "./src/screens/products";
import { View, Text } from "react-native";
import { AuthContextProvider, useAuth } from "./src/auth/AuthContext";

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  Products: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationLayer = () => {
  const { loading, error, user } = useAuth();

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (error) console.log(JSON.stringify(error));

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Products"
            component={ProductsPage}
            options={{ title: "Products" }}
          />
        </Stack.Navigator>
      ) : (
        <SignInScreen />
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <NavigationLayer />
      </AuthContextProvider>
    </ApolloProvider>
  );
}
