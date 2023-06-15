import { View, Text, TextInput, Button, Alert } from "react-native";
import { ScreenProps } from "../../../App";
import { z } from "zod";
import { gql } from "../../__gql__";
import { useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "../../client";
import { AuthScreenLayout } from "../../components/AuthScreenLayout";

const createProductSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Product name must be atleast 4 characters" }),

  photo: z
    .string()
    .url({ message: "Photo must be uploaded correctly" })
    .optional(),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

export const CreateProductScreen: React.FC<
  ScreenProps<"CreateProductScreen">
> = (props) => {
  const CREATE_PRODUCT = gql(`
    mutation createProduct($product: CreateProductInput!) {
      createProduct(product:$product) {
        id
        insertedAt
        name
        photo
        updatedAt
      }
    }
  `);

  const [createProduct, _] = useMutation(CREATE_PRODUCT, {
    onCompleted: async (_) => {
      Alert.alert("Created product!", "Succesfully created product");
      client.refetchQueries({
        include: ["listProducts"],
      });
      props.navigation.goBack();
    },
    onError: (err) =>
      Alert.alert(
        "Something wrong happened while creating the product",
        err.message
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      photo: undefined,
    },
  });

  const onSubmit = handleSubmit((data) => {
    createProduct({
      variables: {
        product: data,
      },
    });
  });

  return (
    <AuthScreenLayout>
      {(_) => (
        <View className="w-full flex flex-col">
          <View>
            <Text>Name: </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="bg-gray-200 p-3 rounded-lg mt-2"
                  placeholder="Macbook Air Pro M1"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
            />

            {errors.name && <Text className="m-2">{errors.name.message}</Text>}
          </View>
          <View className="mt-4">
            <Button title="Create" onPress={onSubmit} />
          </View>
        </View>
      )}
    </AuthScreenLayout>
  );
};
