import { Alert, Button, View, Text, TextInput } from "react-native";
import { ScreenProps } from "../../../App";
import { useMutation, useQuery } from "@apollo/client";
import { client } from "../../client";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql } from "../../__gql__";
import { SelectList } from "react-native-dropdown-select-list";
import CurrencyInput from "react-native-currency-input";
import { AuthScreenLayout } from "../../components/AuthScreenLayout";

const createStockSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  unitPriceInCents: z.number(),
});

type CreateStockSchema = z.infer<typeof createStockSchema>;

export const CreateStockItemScreen: React.FC<
  ScreenProps<"CreateStockItemScreen">
> = (props) => {
  const CREATE_STOCK_ITEM = gql(`
    mutation createStock($stock:CreateStockInput!) {
      createStock(stock:$stock) {
        id productId quantity unitPriceInCents
      }
    }
  `);

  const [createStock] = useMutation(CREATE_STOCK_ITEM, {
    onCompleted: async (_) => {
      await client.refetchQueries({
        include: ["listStocks"],
      });
      props.navigation.navigate("StockItemsScreen");
      Alert.alert("Created stock!", "Succesfully created stock item");
    },
    onError: (err) =>
      Alert.alert(
        "Something wrong happened while creating the stock item",
        err.message
      ),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStockSchema>({
    resolver: zodResolver(createStockSchema),
    defaultValues: {
      productId: undefined,
      quantity: 1,
      unitPriceInCents: 100,
    },
  });

  const onSubmit = handleSubmit((data) => {
    createStock({
      variables: {
        stock: data,
      },
    });
  });

  const LIST_PRODUCTS = gql(`
    query listProducts {
      listProducts {
        id
        name
        photo
        insertedAt
        updatedAt
      }
    }
  `);

  const { data, loading, error, refetch } = useQuery(LIST_PRODUCTS);

  if (error) console.log(error);

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (!data || !data.listProducts)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  const products = data.listProducts;

  return (
    <AuthScreenLayout>
      {(_) => (
        <View className="w-full flex flex-col">
          <View className="mt-2">
            <Text>Product: </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mt-1">
                  <SelectList
                    setSelected={onChange}
                    data={products.map((p) => ({
                      key: p.id,
                      value: p.name,
                    }))}
                    save="key"
                    maxHeight={200}
                  />
                </View>
              )}
              name="productId"
            />

            {errors.productId && <Text>{errors.productId.message}</Text>}
          </View>

          <View className="mt-2">
            <Text>Quantity: </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Quantity"
                  className="bg-gray-200 p-3 rounded-lg mt-1"
                  onBlur={onBlur}
                  onChangeText={(s) => onChange(Number(s))}
                  keyboardType="numeric"
                  value={value.toString()}
                />
              )}
              name="quantity"
            />

            {errors.quantity && <Text>{errors.quantity.message}</Text>}
          </View>

          <View className="mt-2">
            <Text>Price: </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CurrencyInput
                  value={value / 100}
                  className="bg-gray-200 p-3 rounded-lg mt-1"
                  onChangeValue={(v: number) => onChange(v * 100)}
                  prefix="R$"
                />
              )}
              name="unitPriceInCents"
            />

            {errors.unitPriceInCents && (
              <Text>{errors.unitPriceInCents.message}</Text>
            )}
          </View>

          <View className="mt-4">
            <Button title="Create" onPress={onSubmit} />
          </View>
        </View>
      )}
    </AuthScreenLayout>
  );
};
