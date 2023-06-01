defmodule ServerWeb.Schema.Auth do
  use Absinthe.Schema.Notation
  alias ServerWeb.Schema.Error

  object :user, description: "Basic unit of authentication" do
    field(:address, non_null(:string))
    field(:cpf, non_null(:string))
    field(:name, non_null(:string))
    field(:email, non_null(:string))

    field(:password_hash, non_null(:string))

    field(:updated_at, non_null(:naive_datetime))
    field(:inserted_at, non_null(:naive_datetime))
  end

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

  input_object :sign_in_input do
    field(:email, non_null(:string))
    field(:password, non_null(:string))
  end

  object :sign_in_payload do
    field(:token, non_null(:string))
    field(:user_id, non_null(:string))
    field(:user, non_null(:user))
  end

  object :auth_mutation do
    field :sign_in, type: :sign_in_payload do
      arg(:credentials, non_null(:sign_in_input))

      resolve(fn %{credentials: credentials}, _ ->
        case Server.Auth.verify_user(credentials) do
          {:ok, %Server.Auth.User{} = user} ->
            case Server.Auth.create_user_session(%{user_id: user.id}) do
              {:ok, %Server.Auth.UserSession{} = created_user_session} ->
                {:ok, created_user_session |> Server.Repo.preload(:user)}

              {:error, %Ecto.Changeset{} = changeset} ->
                {:error, Error.error_payload(changeset)}

              _ ->
                {:error, "Internal server error"}
            end

          {:error, reason} ->
            {:error, reason}
        end
      end)
    end

    field :create_user, type: :user do
      arg(:user, non_null(:user_input))

      resolve(fn %{user: user}, _ ->
        case Server.Auth.create_user(user) do
          {:ok, created_user} ->
            {:ok, created_user}

          {:error, %Ecto.Changeset{} = changeset} ->
            {:error, Error.error_payload(changeset)}
        end
      end)
    end
  end
end
