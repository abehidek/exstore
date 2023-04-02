defmodule Server.Auth.Session do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "sessions" do
    belongs_to :account, Server.Auth.Account

    timestamps(updated_at: false)
  end

  def changeset(params) do
    %__MODULE__{}
    |> cast(params, [:account_id])
    |> validate_required([:account_id])
  end
end
