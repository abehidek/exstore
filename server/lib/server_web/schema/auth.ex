defmodule ServerWeb.Schema.Auth do
  use Absinthe.Schema.Notation
  import AbsintheErrorPayload.Payload

  import_types(AbsintheErrorPayload.ValidationMessageTypes)

  object :user, description: "Basic unit of authentication" do
    field(:address, non_null(:string))
    field(:cpf, non_null(:string))
    field(:name, non_null(:string))
    field(:email, non_null(:string))

    field(:password, non_null(:string))

    field(:updated_at, non_null(:naive_datetime))
    field(:inserted_at, non_null(:naive_datetime))
  end

  payload_object(:user_payload, :user)

  input_object :user_input do
    field(:address, non_null(:string))
    field(:cpf, non_null(:string))
    field(:name, non_null(:string))
    field(:email, non_null(:string))
    field(:password, non_null(:string))
  end

  object :auth_query do
    field :fizz, :string do
      resolve(fn _, _ -> {:ok, "Fizz buzz"} end)
    end
  end

  object :auth_mutation do
    field :create_user, type: :user_payload do
      arg(:user, non_null(:user_input))

      resolve(fn %{user: user}, _ ->
        case Server.Auth.create_user(user) do
          {:ok, created_user} ->
            {:ok, success_payload(created_user)}

          {:error, %Ecto.Changeset{} = changeset} ->
            {:ok, changeset |> convert_to_payload()}
        end
      end)
    end
  end
end
