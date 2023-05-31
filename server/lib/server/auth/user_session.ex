defmodule Server.Auth.UserSession do
  use Ecto.Schema
  import Ecto.Changeset, warn: false

  @hash_algo :sha256
  @rand_size 32

  schema "users_sessions" do
    field :token, :string

    belongs_to :user, Server.Auth.User

    timestamps(updated_at: false)
  end

  @doc false
  def create_changeset(%__MODULE__{} = user_session, attrs) do
    user_session
    |> cast(attrs, [:user_id])
    |> validate_required([:user_id])
    |> foreign_key_constraint(:user_id)
    |> put_change(:token, :crypto.strong_rand_bytes(@rand_size) |> Base.encode64())
  end
end
