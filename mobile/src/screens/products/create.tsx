import { View, Text, TextInput, Button, Alert } from "react-native";
import { ScreenProps } from "../../../App";
import { z } from "zod";
import { gql } from "../../__gql__";
import { useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "../../client";

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
    <View>
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Macbook Air Pro M1"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />

        {errors.name && <Text>{errors.name.message}</Text>}

        <Button title="Submit" onPress={onSubmit} />
      </View>
    </View>
  );
};
