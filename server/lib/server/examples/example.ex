defmodule Server.Examples.Example do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "example" do
    field :body, :string
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(example, attrs) do
    example
    |> cast(attrs, [:title, :body])
    |> validate_required([:title, :body])
  end
end
