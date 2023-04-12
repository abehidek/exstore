import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const api = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 500,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

const Loading = () => (
  <View>
    <Text>Loading...</Text>
  </View>
);

const Error = (props: { message: string }) => (
  <View>
    <Text>Error: {props.message}</Text>
  </View>
);

const LogIn = () => {
  const [email, setEmail] = useState("abe@email.com");
  const [password, setPassword] = useState("12345678");

  const { mutate } = useMutation(
    ["login"],
    (data: { email: string; password: string }) =>
      api.post("/api/auth/login", data),
    {
      onSuccess: (res) => console.log("login onSucess event:", res),
      onError: (err) => console.log("login onError event:", err),
    }
  );

  function logIn() {
    mutate({
      email,
      password,
    });
  }

  return (
    <View>
      <Text>Log in</Text>
      <TextInput onChangeText={setEmail} value={email} placeholder="Email" />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <Button onPress={logIn} title="Log in" />
    </View>
  );
};

const LogOut = () => {
  const { mutate } = useMutation(
    ["logout"],
    () => api.delete("/api/auth/logout"),
    {
      onSuccess: (res) => console.log("logout onSucess event:", res),
      onError: (err) => console.log("logout onError event:", err),
    }
  );

  function logout() {
    mutate();
  }

  return <Button onPress={logout} title="Logout" />;
};

const HomeScreen = () => {
  const { data, isError, error, isLoading, refetch } = useQuery<
    AxiosResponse<{
      data?: { email: string; confirmed_at: string | null; updated_at: string };
    }>
  >(["me"], () =>
    api.get("/api/auth/me", {
      validateStatus: () => true,
    })
  );

  // if (isError) return <Error message={error.message} />;

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to sssstart working on your app!</Text>
      <Button onPress={() => refetch()} title="Refresh data" />
      <StatusBar style="auto" />
      {data && "data" in data.data ? (
        <View>
          <Text>{JSON.stringify(data.data)}</Text>
          <LogOut />
        </View>
      ) : (
        <LogIn />
      )}
    </View>
  );
};

const white = "#fff";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: white,
    flex: 1,
    justifyContent: "center",
  },
});
