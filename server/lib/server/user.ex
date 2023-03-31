defmodule Server.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "users" do
    field :email, :string
    field :password_hash, :string, redact: false
    field :confirmed_at, :naive_datetime

    timestamps()

    field :password, :string, virtual: true, redact: false
  end

  def register_changeset(params, _opts \\ []) do
    %__MODULE__{}
    |> cast(params, [:email, :password])
    |> validate_password()
    |> hash_password()
  end

  defp validate_password(changeset) do
    changeset
    |> validate_required([:password])
    |> validate_length(:password, min: 8, max: 20)
  end

  defp hash_password(changeset) do
    password = get_change(changeset, :password)

    changeset
    |> put_change(:password_hash, password)
    |> delete_change(:password)
  end
end
