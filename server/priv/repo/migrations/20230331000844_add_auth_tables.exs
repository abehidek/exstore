defmodule Server.Repo.Migrations.AddAuthTables do
  use Ecto.Migration

  def change do
    create table(:accounts, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :email, :string
      add :password_hash, :string
      add :confirmed_at, :naive_datetime

      timestamps()
    end
    create unique_index(:accounts, [:email])

    create table(:sessions, primary_key: false) do
      add :id, :binary_id, primary_key: true

      add :account_id, references(:accounts, on_delete: :delete_all, type: :binary_id, column: :id)

      timestamps(updated_at: false)
    end
    create index(:sessions, [:account_id])

    create table(:users, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :full_name, :string
      add :biography, :text

      add :account_id, references(:accounts, on_delete: :delete_all, type: :binary_id, column: :id)

      timestamps()
    end
    create index(:users, [:full_name])
    create unique_index(:users, [:account_id])


  end
end
