defmodule Server.Repo.Migrations.AddAuthTables do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :binary, primary_key: true
      add :email, :string, null: false
      add :password_hash, :string, null: false
      add :confirmed_at, :naive_datetime

      timestamps()
    end
    create unique_index(:users, [:email])

    create table(:sessions, primary_key: false) do
      add :id, :binary, primary_key: true
      add :user_id, references(:users, type: :binary, on_delete: :delete_all, column: :id), null: false

      timestamps(updated_at: false)
    end
  end
end
