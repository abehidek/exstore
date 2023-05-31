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
  end
end
