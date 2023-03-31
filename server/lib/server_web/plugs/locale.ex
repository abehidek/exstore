defmodule ServerWeb.Plugs.Locale do
  import Plug.Conn

  @locales ["en", "fr", "de"]

  def init(default), do: default

  def call(%Plug.Conn{params: %{"locale" => lc}} = conn, _default) when lc in @locales do
    assign(conn, :locale, lc)
  end

  def call(conn, default) do
    assign(conn, :locale, default)
  end
end
