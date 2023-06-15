import { ScreenProps } from "../../../App";
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Button,
  Alert,
  Image,
} from "react-native";
import { gql } from "../../__gql__";
import { useMutation, useQuery } from "@apollo/client";
import { Product } from "../../__gql__/graphql";
import { AuthScreenLayout } from "../../components/AuthScreenLayout";
import { TouchableOpacity } from "react-native-gesture-handler";
import Trash from "../../../assets/trash.svg";

export const ProductsScreen: React.FC<ScreenProps<"ProductsScreen">> = (
  props
) => {
  const DELETE_PRODUCT = gql(`
    mutation deleteProduct($productId:Int!){
      deleteProduct(productId:$productId){
        id
        name
        insertedAt
        photo
      }
    }
  `);

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: async (_) => {
      refetch();
      Alert.alert("Deleted product!", "Succesfully deleted product");
    },
    onError: (err) =>
      Alert.alert(
        "Something wrong happened while deleting the product",
        err.message
      ),
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
            onPress={() => props.navigation.navigate("CreateProductScreen")}
          >
            <Text className="text-white font-bold text-lg">+</Text>
          </TouchableOpacity>

          <View className="flex-1 mt-2">
            {data && data.listProducts && data.listProducts.length > 0 ? (
              <FlatList
                data={data.listProducts}
                keyExtractor={(e) => e.id.toString()}
                renderItem={(e) => (
                  <ProductItem
                    product={e.item}
                    onDeleteProduct={(id) =>
                      deleteProduct({
                        variables: { productId: id },
                      })
                    }
                  />
                )}
              />
            ) : (
              <View className="w-full flex h-full items-center py-36">
                <Text>No products found</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </AuthScreenLayout>
  );
};

export const ProductItem = (props: {
  product: Product;
  onDeleteProduct: (id: number) => void;
}) => {
  return (
    <View className="flex flex-row justify-between items-center p-4 bg-gray-200 rounded-lg mt-1">
      <Text>{props.product.name}</Text>
      <Trash
        className="self-end"
        width={20}
        height={20}
        onPress={() => props.onDeleteProduct(props.product.id)}
      />
    </View>
  );
};
