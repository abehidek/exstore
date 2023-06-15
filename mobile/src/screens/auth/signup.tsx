import {
  Button,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScreenProps } from "../../../App";
import { MaskedTextInput } from "react-native-mask-text";
import { gql } from "../../__gql__";
import { client } from "../../client";
import { useMutation } from "@apollo/client";

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    cpf: z.string().min(1, { message: "CPF is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

export const SignUpScreen: React.FC<ScreenProps<"SignUpScreen">> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      address: "",
      cpf: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const SIGN_UP = gql(`
    mutation createUser($user: UserInput!) {
      createUser(user: $user) {
        id
        name
        cpf
        email
        insertedAt
        updatedAt
      }
    }
  `);

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: async (_) => {
      Alert.alert("Signed up succesfully!");
      props.navigation.navigate("SignInScreen");
    },
    onError: (err) => {
      Alert.alert("Something wrong happened while signing up", err.message),
        client.refetchQueries({
          include: ["getMe"],
        });
    },
  });

  const onSubmit = handleSubmit(({ confirmPassword: _, ...data }) => {
    signUp({
      variables: {
        user: data,
      },
    });
  });

  return (
    <SafeAreaView className="bg-grey-100 h-screen flex items-center p-5 w-full overflow-hidden">
      <View className="w-full flex flex-col">
        {/* NAME */}
        <View className="mt-2">
          <Text>Name: </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="John Doe"
                onBlur={onBlur}
                className="bg-gray-200 p-3 rounded-lg mt-1"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && <Text>{errors.name.message}</Text>}
        </View>

        {/* ADDRESS */}
        <View className="mt-2">
          <Text>Address: </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Street 2"
                className="bg-gray-200 p-3 rounded-lg mt-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="address"
          />
          {errors.address && <Text>{errors.address.message}</Text>}
        </View>

        {/* CPF */}
        <View className="mt-2">
          <Text>CPF: </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <MaskedTextInput
                mask="999.999.999-99"
                className="bg-gray-200 p-3 rounded-lg mt-1"
                onChangeText={(text, _) => onChange(text)}
                placeholder="321.456.987-00"
                onBlur={onBlur}
                value={value}
              />
            )}
            name="cpf"
          />
          {errors.cpf && <Text>{errors.cpf.message}</Text>}
        </View>

        {/* EMAIL */}
        <View className="mt-2">
          <Text>Email: </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="john@email.com"
                className="bg-gray-200 p-3 rounded-lg mt-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && <Text>{errors.email.message}</Text>}
        </View>

        {/* PASSWORD */}
        <View className="mt-2">
          <Text>Password: </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="******"
                className="bg-gray-200 p-3 rounded-lg mt-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          {errors.password && <Text>{errors.password.message}</Text>}
        </View>

        {/* CONFIRM PASSWORD */}
        <View className="mt-2">
          <Text>Confirm Password: </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="*******"
                onBlur={onBlur}
                onChangeText={onChange}
                className="bg-gray-200 p-3 rounded-lg mt-1"
                value={value}
                secureTextEntry={true}
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && (
            <Text>{errors.confirmPassword.message}</Text>
          )}
        </View>

        <View className="mt-4">
          <Button title="Create account" onPress={onSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};
