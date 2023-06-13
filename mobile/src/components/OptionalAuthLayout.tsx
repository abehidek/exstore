import { useQuery } from "@apollo/client";
import { User } from "../__gql__/graphql";
import { gql } from "../__gql__";
import { View, Text } from "react-native";

type Props = {
  children: ({ user }: { user?: User }) => React.ReactNode;
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

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (error) {
    console.log(JSON.stringify(error));
    return (
      <View>
        {props.children({
          user: undefined,
        })}
      </View>
    );
  }

  return (
    <View>
      {props.children({
        user: data.me.user,
      })}
    </View>
  );
};
