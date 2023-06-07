defmodule Server.Inventory do
  @moduledoc """
  The Inventory context.
  """

  import Ecto.Query, warn: false
  alias Server.Repo

  alias Server.Inventory.{Product, Stock}

  def list_products do
    Repo.all(Product)
  end

  def get_product(id) do
    Repo.get_by(Product, id: id)
  end

  def create_product(attrs \\ %{}) do
    %Product{}
    |> Product.changeset(attrs)
    |> Repo.insert()
  end

  def delete_product(%Product{} = product) do
    Repo.delete(product)
  end

  def create_stock(attrs \\ %{}) do
    %Stock{}
    |> Stock.changeset(attrs)
    |> Repo.insert()
  end
end
