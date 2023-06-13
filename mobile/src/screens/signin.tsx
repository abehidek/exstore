import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { ScreenProps } from "../../App";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { gql } from "../__gql__";
import { useMutation } from "@apollo/client";
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

const signInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type SignInSchema = z.infer<typeof signInSchema>;

const SIGN_IN = gql(`
  mutation signIn($credentials: SignInInput!) {
    signIn(credentials: $credentials) {
      user {
        address
        cpf
        email
        name
      }
      token
      userId
    }
  }
`);

export const SignInScreen: React.FC<ScreenProps<"SignIn">> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "eba@email.com",
      password: "12345678",
    },
  });

  const [signIn, _] = useMutation(SIGN_IN, {
    onCompleted: async (res) => {
      if (!res.signIn) return;
      Alert.alert("Signed in succesfully!");
      await AsyncStorage.setItem("@token", res.signIn.token);
      props.navigation.navigate("Home");
    },
    onError: (err) => Alert.alert("Something wrong happened", err.message),
  });

  const onSubmit = handleSubmit((data) => {
    signIn({
      variables: {
        credentials: data,
      },
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />

        {errors.email && <Text>{errors.email.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />

        {errors.password && <Text>{errors.password.message}</Text>}

        <Button title="Submit" onPress={onSubmit} />
      </View>
    </SafeAreaView>
  );
};
