defmodule ServerWeb.Plugs.Authenticate do
  import Plug.Conn

  def init(default) do
    default
  end

  def call(%Plug.Conn{} = conn, _default) do
    conn
  end
end
