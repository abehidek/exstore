defmodule Server.Auth.Account do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "accounts" do
    field :email, :string
    field :password_hash, :string
    field :confirmed_at, :naive_datetime

    has_one :user, Server.Auth.User
    has_many :sessions, Server.Auth.Session

    timestamps()

    field :password, :string, virtual: true, redact: false
  end

  def changeset(params) do
    %__MODULE__{}
    |> cast(params, [:email, :password])
    |> validate_email()
    |> validate_password()
    |> hash_password()
  end

  defp validate_email(changeset) do
    changeset
    |> validate_format(:email, ~r/^[^\s]+@[^\s]+$/, message: "wrong email format")
    |> validate_required([:email])
    |> unique_constraint(:email)
  end

  defp validate_password(changeset) do
    changeset
    |> validate_required([:password])
    |> validate_length(:password, min: 8, max: 20)
  end

  defp hash_password(changeset) do
    password = get_change(changeset, :password)

    changeset
    |> put_change(:password_hash, Bcrypt.hash_pwd_salt(password))
    |> delete_change(:password)
  end
end
