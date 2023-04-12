defmodule ServerWeb.Plugs.Authenticate do
  import Plug.Conn

  def init(default) do
    default
  end

  def call(%Plug.Conn{} = conn, _default) do
    conn |> IO.inspect(label: "Authenticate Plug")

    with %{cookies: %{"session_id" => session_id}} <- fetch_cookies(conn, signed: ~w(session_id)),
         %Server.Auth.Account{} = account <- Server.Auth.get_account_by_session_id(session_id) do
      conn
      |> assign(:account, account)
      |> assign(:session_id, session_id)
    else
      %{cookies: %{}} -> ServerWeb.FallbackController.call(conn, {:error, :unauthorized})
      nil -> ServerWeb.FallbackController.call(conn, {:error, :unauthorized})
      _ -> ServerWeb.FallbackController.call(conn, {:error, :internal_server_error})
    end
  end
end
