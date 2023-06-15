defmodule Server.Inventory.Stock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "stocks" do
    field(:quantity, :integer)
    field(:unit_price_in_cents, :integer)

    belongs_to(:product, Server.Inventory.Product)
  end

  @doc false
  def changeset(%__MODULE__{} = stock, attrs) do
    stock
    |> cast(attrs, [:quantity, :unit_price_in_cents, :product_id])
    |> validate_required([:quantity, :unit_price_in_cents, :product_id])
    |> unique_constraint(:product_id)
    |> foreign_key_constraint(:product_id)
  end
end
