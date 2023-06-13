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
    <SafeAreaView className="bg-grey-100 h-screen flex items-center justify-center">
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

        <Text>Does not have an account?</Text>
        <Button
          title="Sign up"
          onPress={() => props.navigation.navigate("SignUpScreen")}
        />
      </View>
    </SafeAreaView>
  );
};