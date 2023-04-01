defmodule Server.Repo.Migrations.CreateExample do
  use Ecto.Migration

  def change do
    create table(:example, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :title, :string
      add :body, :text

      timestamps()
    end
  end
end
