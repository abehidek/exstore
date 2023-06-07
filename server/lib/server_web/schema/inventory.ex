defmodule ServerWeb.Schema.Inventory do
  use Absinthe.Schema.Notation
  alias ServerWeb.Schema.Error, warn: false
  alias Server.{Repo, Inventory}, warn: false

  object :inventory_query do
    field :list_products, type: list_of(:product) do
      resolve(fn _, _ ->
        {:ok, Inventory.list_products()}
      end)
    end
  end

  object :product do
    field(:id, non_null(:integer))
    field(:name, non_null(:string))
    field(:photo, :string)
    field(:updated_at, non_null(:naive_datetime))
    field(:inserted_at, non_null(:naive_datetime))
  end

  input_object :create_product_input do
    field(:name, non_null(:string))
    field(:photo, :string)
  end

  # object :create_stock_payload do
  #   field :id, non_null(:integer)
  #   field :quantity, non_null(:integer)
  #   field :unit_price_in_cents, non_null(:integer)
  #   field :product_id, non_null(:integer)
  #   field :product, non_null(:product)
  # end

  object :inventory_mutation do
    field :create_product, type: non_null(:product) do
      arg(:product, non_null(:create_product_input))

      resolve(fn %{product: product}, _ ->
        case Inventory.create_product(product) do
          {:ok, %Inventory.Product{} = product} -> {:ok, product}
          {:error, %Ecto.Changeset{} = changeset} -> {:error, Error.error_payload(changeset)}
          _ -> {:error, "Internal Server Error"}
        end
      end)
    end

    field :delete_product, type: non_null(:product) do
      arg(:product_id, non_null(:integer))

      resolve(fn %{product_id: product_id}, _ ->
        case Inventory.get_product(product_id) do
          %Inventory.Product{} = product ->
            case Inventory.delete_product(product) do
              {:ok, %Inventory.Product{} = deleted_product} -> {:ok, deleted_product}
              {:error, %Ecto.Changeset{} = changeset} -> {:error, Error.error_payload(changeset)}
              _ -> {:error, "Internal Server Error"}
            end

          nil ->
            {:error, "Product not found"}
        end
      end)
    end
  end
end
