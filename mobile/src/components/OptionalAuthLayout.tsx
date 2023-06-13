import { ApolloQueryResult, useQuery } from "@apollo/client";
import { Exact, GetMeQuery, User } from "../__gql__/graphql";
import { gql } from "../__gql__";
import { View, Text } from "react-native";

type Props = {
  children: ({
    user,
    refetch,
  }: {
    user?: User;
    refetch: (
      variables?:
        | Partial<
            Exact<{
              [key: string]: never;
            }>
          >
        | undefined
    ) => Promise<ApolloQueryResult<GetMeQuery>>;
  }) => React.ReactNode;
};

export const OptionalAuthLayout: React.FC<Props> = (props) => {
  const ME = gql(`
    query getMe {
      me {
        token
        id
        userId
        user {
          name address email cpf insertedAt updatedAt passwordHash
        }
      }
    }
  `);

  const { loading, error, data, refetch } = useQuery(ME);

  if (error) {
    console.log(JSON.stringify(error));
    return (
      <View>
        {props.children({
          user: undefined,
          refetch,
        })}
      </View>
    );
  }

  if (loading || !data || !data.me)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View>
      {props.children({
        user: data.me.user,
        refetch,
      })}
    </View>
  );
};
