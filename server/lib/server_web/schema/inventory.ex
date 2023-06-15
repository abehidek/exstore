defmodule ServerWeb.Schema.Inventory do
  use Absinthe.Schema.Notation
  alias ServerWeb.Schema.Error, warn: false
  alias Server.{Repo, Inventory}, warn: false

  object :inventory_query do
    field :list_products, type: list_of(non_null(:product)) do
      middleware ServerWeb.Middleware.Authentication

      resolve(fn _, _ ->
        {:ok, Inventory.list_products()}
      end)
    end

    field :list_stocks, type: list_of(non_null(:stock)) do
      middleware ServerWeb.Middleware.Authentication

      resolve(fn _, _ ->
        {:ok, Inventory.list_stocks()}
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

  object :stock do
    field(:id, non_null(:integer))
    field(:product_id, non_null(:integer))
    field(:quantity, non_null(:integer))
    field(:unit_price_in_cents, non_null(:integer))
  end

  input_object :create_stock_input do
    field(:product_id, non_null(:integer))
    field(:quantity, non_null(:integer))
    field(:unit_price_in_cents, non_null(:integer))
  end

  object :inventory_mutation do
    field :create_product, type: non_null(:product) do
      arg(:product, non_null(:create_product_input))

      middleware ServerWeb.Middleware.Authentication

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

      middleware ServerWeb.Middleware.Authentication

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

    field :create_stock, type: non_null(:stock) do
      arg :stock, non_null(:create_stock_input)

      middleware ServerWeb.Middleware.Authentication

      resolve(fn %{stock: stock}, _ ->
        case Inventory.create_stock(stock) do
          {:ok, %Inventory.Stock{} = stock} -> {:ok, stock}
          {:error, %Ecto.Changeset{} = changeset} -> {:error, Error.error_payload(changeset)}
          _ -> {:error, "Internal Server Error"}
        end
      end)
    end

    field :delete_stock, type: non_null(:stock) do
      arg(:stock_id, non_null(:integer))

      middleware ServerWeb.Middleware.Authentication

      resolve(fn %{stock_id: stock_id}, _ ->
        case Inventory.get_stock(stock_id) do
          %Inventory.Stock{} = stock ->
            case Inventory.delete_stock(stock) do
              {:ok, %Inventory.Stock{} = deleted_stock} -> {:ok, deleted_stock}
              {:error, %Ecto.Changeset{} = changeset} -> {:error, Error.error_payload(changeset)}
              _ -> {:error, "Internal Server Error"}
            end

          nil ->
            {:error, "Stock item not found"}
        end
      end)
    end
  end
end
