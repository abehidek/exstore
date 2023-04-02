defmodule Server.Auth.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    field :full_name, :string
    field :biography, :string

    belongs_to :account, Server.Auth.Account

    timestamps()
  end

  def changeset(params) do
    %__MODULE__{}
    |> cast(params, [:account_id, :full_name, :biography])
    |> validate_required([:account_id])
    |> unique_constraint(:account_id)
  end
end
