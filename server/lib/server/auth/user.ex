defmodule Server.Auth.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field(:address, :string)
    field(:cpf, :string)
    field(:email, :string)
    field(:name, :string)

    field(:password_hash, :string, redact: false)
    field(:password, :string, redact: false, virtual: true)

    timestamps()
  end

  @doc false
  def changeset(%__MODULE__{} = user, attrs) do
    user
    |> cast(attrs, [:name, :email, :cpf, :address, :password])
    |> validate_required([:name, :cpf, :address])
    |> validate_email()
    |> validate_password()
    |> hash_password()
  end

  defp validate_email(%Ecto.Changeset{} = changeset) do
    changeset
    |> validate_required([:email])
    |> validate_format(:email, ~r/^[^\s]+@[^\s]+$/, message: "must have the @ sign and no spaces")
    |> validate_length(:email, max: 160)
    |> unique_constraint(:email)
  end

  defp validate_password(%Ecto.Changeset{} = changeset) do
    changeset
    |> validate_required([:password])
    |> validate_length(:password, min: 3, max: 72)
  end

  defp hash_password(%Ecto.Changeset{} = changeset) do
    password = changeset |> get_change(:password)

    if password && changeset.valid? do
      changeset
      |> put_change(:password_hash, Bcrypt.hash_pwd_salt(password))
      |> delete_change(:password)
    else
      changeset
    end
  end

  def valid_password?(%__MODULE__{} = user, password) when is_binary(password) do
    Bcrypt.verify_pass(password, user.password_hash)
  end
end
