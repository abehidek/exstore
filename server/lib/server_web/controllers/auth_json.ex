defmodule ServerWeb.AuthJSON do
  def index(%{accounts: accounts}) do
    %{data: for(account <- accounts, do: data(account))}
  end

  def show(%{account: account}) do
    %{data: data(account)}
  end

  defp data(%Server.Auth.Account{} = account) do
    %{
      id: account.id,
      email: account.email,
      confirmed_at: account.confirmed_at,
      updated_at: account.updated_at,
    }
  end
end
