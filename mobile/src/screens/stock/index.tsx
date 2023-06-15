import { Alert, Button, View, Text, FlatList } from "react-native";
import { ScreenProps } from "../../../App";
import { gql } from "../../__gql__";
import { useMutation, useQuery } from "@apollo/client";
import { Stock } from "../../__gql__/graphql";

export const StockItemsScreen: React.FC<ScreenProps<"StockItemsScreen">> = (
  props
) => {
  const DELETE_STOCK = gql(`
    mutation deleteStock($stockId:Int!) {
      deleteStock(stockId:$stockId) {
        id productId quantity unitPriceInCents
      }
    }
  `);

  const [deleteStock] = useMutation(DELETE_STOCK, {
    onCompleted: async (_) => {
      refetch();
      Alert.alert("Deleted stock!", "Succesfully deleted stock item");
    },
    onError: (err) =>
      Alert.alert(
        "Something wrong happened while deleting the stock item",
        err.message
      ),
  });

  const LIST_STOCK = gql(`
    query listStocks {
      listStocks {
        id productId quantity unitPriceInCents product {
          id name photo insertedAt updatedAt
        }
      }
    }
  `);

  const { data, loading, error, refetch } = useQuery(LIST_STOCK);

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (error) console.log(error);

  return (
    <View>
      <Button
        title="Create new stock item"
        onPress={() => props.navigation.navigate("CreateStockItemScreen")}
      />
      {data && data.listStocks && data.listStocks.length > 0 ? (
        <FlatList
          data={data.listStocks}
          keyExtractor={(e) => e.id.toString()}
          renderItem={(e) => (
            <StockItem
              stock={e.item}
              onDeleteStockItem={(id) =>
                deleteStock({
                  variables: { stockId: id },
                })
              }
            />
          )}
        />
      ) : (
        <Text>No stock found</Text>
      )}
    </View>
  );
};

export const StockItem = (props: {
  stock: Stock;
  onDeleteStockItem: (id: number) => void;
}) => {
  return (
    <View className="flex flex-row justify-center items-center p-4 bg-gray-300 rounded-lg gap-3">
      <Text>name: {props.stock.product.name}</Text>
      <Text>Quantity: {props.stock.quantity}</Text>
      <Text>Price: R$ {(props.stock.unitPriceInCents / 100).toFixed(2)}</Text>
      <Button
        title="X"
        onPress={() => props.onDeleteStockItem(props.stock.id)}
      />
    </View>
  );
};
