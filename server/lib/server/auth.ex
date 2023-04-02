defmodule Server.Auth do
  import Ecto.Query, warn: false

  @spec get_account_by_email(String.t()) :: %Server.Auth.Account{} | nil
  def get_account_by_email(email) do
    Server.Auth.Account
    |> where(email: ^email)
    |> Server.Repo.one()
  end

  @spec create_session(%Server.Auth.Account{}) :: {:ok, %Server.Auth.Session{}} | {:error, %Ecto.Changeset{}}
  def create_session(%Server.Auth.Account{} = account) do
    %{account_id: account.id} |> Server.Auth.Session.changeset() |> Server.Repo.insert()
  end
end
