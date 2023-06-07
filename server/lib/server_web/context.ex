defmodule ServerWeb.Context do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  def build_context(conn) do
    IO.inspect("building context")

    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         %Server.Auth.UserSession{} = user_session <- Server.Auth.get_user_session_by_token(token) do
      %{user_session: user_session |> Server.Repo.preload(:user)}
    else
      _ -> %{user_session: nil}
    end
  end
end
