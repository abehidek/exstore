defmodule Server.Repo.Migrations.DatabaseSchema do
  use Ecto.Migration

  def change do
    # USERS
    create table(:users) do
      add :name, :string
      add :email, :string, null: false
      add :cpf, :string, null: false
      add :address, :string, null: false

      add :password_hash, :string, null: false

      timestamps()
    end

    create unique_index(:users, [:email])

    # USERS SESSIONS
    create table(:users_sessions) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :token, :string, null: false

      timestamps(updated_at: false)
    end

    create index(:users_sessions, [:user_id])
    create unique_index(:users_sessions, [:token])

    # PRODUCTS
    create table(:products) do
      add :name, :string, null: false
      add :photo, :string, null: true

      timestamps()
    end

    # STOCK
    create table(:stocks) do
      add :product_id, references(:products, on_delete: :delete_all), null: false
      add :quantity, :integer, null: false
      add :unit_price_in_cents, :integer, null: false
    end

    create unique_index(:stocks, [:product_id])
  end
end
