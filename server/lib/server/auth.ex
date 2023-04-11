defmodule Server.Auth do
  import Ecto.Query, warn: false

  @spec get_account_by_email(String.t()) :: %Server.Auth.Account{} | nil
  def get_account_by_email(email) do
    Server.Auth.Account
    |> where(email: ^email)
    |> Server.Repo.one()
  end

  @spec get_account_by_session_id(String.t()) :: %Server.Auth.Account{} | nil
  def get_account_by_session_id(session_id) do
    from(
      session in Server.Auth.Session,
      join: account in assoc(session, :account),
      where: [id: ^session_id], select: account
    )
    |> Server.Repo.one()
  end

  @spec create_session(%Server.Auth.Account{}) :: {:ok, %Server.Auth.Session{}} | {:error, %Ecto.Changeset{}}
  def create_session(%Server.Auth.Account{} = account) do
    %{account_id: account.id} |> Server.Auth.Session.changeset() |> Server.Repo.insert()
  end
end
