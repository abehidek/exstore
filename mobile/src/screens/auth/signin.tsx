import { Button, Text, View, SafeAreaView, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../auth/AuthContext";
import { ScreenProps } from "../../../App";

const signInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type SignInSchema = z.infer<typeof signInSchema>;

export const SignInScreen: React.FC<ScreenProps<"SignInScreen">> = (props) => {
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

  const { signIn } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signIn({
      variables: {
        credentials: data,
      },
    });
  });

  return (
    <SafeAreaView className="bg-grey-100 h-screen flex items-center p-5 w-full overflow-hidden">
      <View className="w-full flex flex-col">
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

        <View className="mt-2">
          <Text>Password: </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="*******"
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

        <View className="mt-4">
          <Button title="Submit" onPress={onSubmit} />
        </View>

        <View className="mt-4">
          <Text>Does not have an account?</Text>
          <View className="mt-2">
            <Button
              title="Sign up"
              onPress={() => props.navigation.navigate("SignUpScreen")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
