import { client } from "./src/client";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { AuthContextProvider, useAuth } from "./src/auth/AuthContext";

import { SignInScreen } from "./src/screens/signin";
import { HomeScreen } from "./src/screens/home";
import { ProductsScreen } from "./src/screens/products";
import { CreateProductScreen } from "./src/screens/products/create";
import { StockItemsScreen } from "./src/screens/stock";
import { CreateStockItemScreen } from "./src/screens/stock/create";

export type RootStackParamList = {
  HomeScreen: undefined;
  ProductsScreen: undefined;
  CreateProductScreen: undefined;
  StockItemsScreen: undefined;
  CreateStockItemScreen: undefined;
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
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="ProductsScreen"
            component={ProductsScreen}
            options={{ title: "Products" }}
          />
          <Stack.Screen
            name="CreateProductScreen"
            component={CreateProductScreen}
            options={{ title: "Create Product" }}
          />
          <Stack.Screen
            name="StockItemsScreen"
            component={StockItemsScreen}
            options={{ title: "Stock" }}
          />
          <Stack.Screen
            name="CreateStockItemScreen"
            component={CreateStockItemScreen}
            options={{ title: "Create Stock Item" }}
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
