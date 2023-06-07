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

    field :sign_out, type: non_null(:me_payload) do
      arg(:auth, non_null(:me_input))

      resolve(fn %{auth: %{token: token}}, _ ->
        IO.inspect(token)

        case Server.Auth.get_user_session_by_token(token) do
          %Server.Auth.UserSession{} = user_session ->
            case user_session |> Server.Auth.delete_user_session() do
              {:ok, %Server.Auth.UserSession{} = deleted_user_session} ->
                {:ok, deleted_user_session |> Server.Repo.preload(:user)}

              {:error, %Ecto.Changeset{} = changeset} ->
                {:error, Error.error_payload(changeset)}

              _ ->
                {:error, "Internal Server Error"}
            end

          nil ->
            {:error, "Session not found"}
        end
      end)
    end
  end

  input_object :me_input do
    field(:token, non_null(:string))
  end

  object :me_payload do
    field(:id, non_null(:string))
    field(:token, non_null(:string))
    field(:user_id, non_null(:string))
    field(:user, non_null(:user))
    field(:inserted_at, non_null(:naive_datetime))
  end

  object :auth_query do
    field :me, type: :me_payload do
      arg(:auth, non_null(:me_input))

      resolve(fn %{auth: %{token: token}}, _ ->
        case Server.Auth.get_user_session_by_token(token) do
          %Server.Auth.UserSession{} = user_session ->
            {:ok, user_session |> Server.Repo.preload(:user)}

          nil ->
            {:error, "Session not found"}
        end
      end)
    end
  end
end
