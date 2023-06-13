import { ScreenProps } from "../../../App";
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { gql } from "../../__gql__";
import { useMutation, useQuery } from "@apollo/client";
import { Product } from "../../__gql__/graphql";

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
    <SafeAreaView className="bg-grey-100 h-screen flex items-center justify-center">
      <Text>Products</Text>
      <Button
        title="Create new product"
        onPress={() => props.navigation.navigate("CreateProductScreen")}
      />
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
        <Text>No products found</Text>
      )}
    </SafeAreaView>
  );
};

export const ProductItem = (props: {
  product: Product;
  onDeleteProduct: (id: number) => void;
}) => {
  return (
    <View className="flex flex-row justify-center items-center p-4 bg-gray-300 rounded-lg">
      <Text>{props.product.name}</Text>
      <Button
        title="X"
        onPress={() => props.onDeleteProduct(props.product.id)}
      />
    </View>
  );
};
