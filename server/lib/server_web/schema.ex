defmodule ServerWeb.Schema do
  use Absinthe.Schema

  import_types Absinthe.Type.Custom
  import_types ServerWeb.Schema.Auth

  query do
    import_fields :auth_query
  end

  mutation do
    import_fields :auth_mutation
  end
end
