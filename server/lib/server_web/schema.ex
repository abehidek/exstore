defmodule ServerWeb.Schema do
  use Absinthe.Schema

  import_types Absinthe.Type.Custom
  import_types ServerWeb.Schema.Auth
  import_types ServerWeb.Schema.Inventory

  query do
    import_fields :auth_query
    import_fields :inventory_query
  end

  mutation do
    import_fields :auth_mutation
    import_fields :inventory_mutation
  end
end
