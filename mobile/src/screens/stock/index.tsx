import {
  Alert,
  Button,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ScreenProps } from "../../../App";
import { gql } from "../../__gql__";
import { useMutation, useQuery } from "@apollo/client";
import { Stock } from "../../__gql__/graphql";
import { AuthScreenLayout } from "../../components/AuthScreenLayout";
import Trash from "../../../assets/trash.svg";

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
    <AuthScreenLayout>
      {(_) => (
        <View className="w-full flex flex-col h-full">
          <TouchableOpacity
            className="bg-blue-500 py-3 px-5 flex justify-center items-center rounded-md"
            onPress={() => props.navigation.navigate("CreateStockItemScreen")}
          >
            <Text className="text-white font-bold text-lg">+</Text>
          </TouchableOpacity>
          <View className="mt-2">
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
              <View className="w-full flex h-full items-center py-36">
                <Text>No stock found</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </AuthScreenLayout>
  );
};

export const StockItem = (props: {
  stock: Stock;
  onDeleteStockItem: (id: number) => void;
}) => {
  return (
    <View className="flex flex-row justify-between items-center p-4 bg-gray-200 rounded-lg mt-1">
      <Text>{props.stock.product.name}</Text>
      <View className="flex flex-row self-end gap-2">
        <Text>Qtd: {props.stock.quantity}</Text>
        <Text>R$ {(props.stock.unitPriceInCents / 100).toFixed(2)}</Text>
        <Trash
          width={20}
          height={20}
          onPress={() => props.onDeleteStockItem(props.stock.id)}
        />
      </View>
    </View>
  );
};
