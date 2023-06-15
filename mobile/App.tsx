import "react-native-gesture-handler";
import { client } from "./src/client";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { AuthContextProvider, useAuth } from "./src/auth/AuthContext";
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";

import { SignInScreen } from "./src/screens/auth/signin";
import { SignUpScreen } from "./src/screens/auth/signup";
import { HomeScreen } from "./src/screens/home";
import { ProductsScreen } from "./src/screens/products";
import { CreateProductScreen } from "./src/screens/products/create";
import { StockItemsScreen } from "./src/screens/stock";
import { CreateStockItemScreen } from "./src/screens/stock/create";

export type RootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  HomeScreen: undefined;
  ProductsScreen: undefined;
  CreateProductScreen: undefined;
  StockItemsScreen: undefined;
  CreateStockItemScreen: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = DrawerScreenProps<
  RootStackParamList,
  T
>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

export const NavigationLayer = () => {
  const { loading, error, user } = useAuth();

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (error.result) console.log(error.message);

  return (
    <NavigationContainer>
      {user ? (
        <Drawer.Navigator initialRouteName="HomeScreen">
          <Drawer.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          <Drawer.Screen
            name="ProductsScreen"
            component={ProductsScreen}
            options={{ title: "Products" }}
          />
          <Drawer.Screen
            name="CreateProductScreen"
            component={CreateProductScreen}
            options={{ title: "Create Product" }}
          />
          <Drawer.Screen
            name="StockItemsScreen"
            component={StockItemsScreen}
            options={{ title: "Stock" }}
          />
          <Drawer.Screen
            name="CreateStockItemScreen"
            component={CreateStockItemScreen}
            options={{ title: "Create Stock Item" }}
          />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{ title: "Sign in" }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ title: "Sign up" }}
          />
        </Stack.Navigator>
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
