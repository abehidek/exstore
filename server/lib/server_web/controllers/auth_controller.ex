defmodule ServerWeb.AuthController do
  use ServerWeb, :controller
  use Goal

  plug ServerWeb.Plugs.Authenticate when action in [:show]

  action_fallback ServerWeb.FallbackController

  def show(conn, _params) do
    with %{cookies: %{"session_id" => session_id}} <- fetch_cookies(conn, signed: ~w(session_id)),
      %Server.Auth.Account{} = account <- Server.Auth.get_account_by_session_id(session_id) do
      conn
      |> put_status(:ok)
      |> assign(:account, account)
      |> render(:show)
    else
      %{cookies: %{}} -> ServerWeb.FallbackController.call(conn, {:error, :unauthorized})
      _ -> ServerWeb.FallbackController.call(conn, {:error, :internal_server_error})
    end
  end

  @spec validate_email(%Plug.Conn{}, String.t()) :: %Plug.Conn{} | {:error, :unauthorized}
  defp validate_email(conn, email) do
    case Server.Auth.get_account_by_email(email) do
      nil ->
        ServerWeb.FallbackController.call(conn, {:error, :unauthorized})

      %Server.Auth.Account{} = account ->
        conn
        |> assign(:account, account)
    end
  end

  @spec validate_password(%Plug.Conn{}, String.t()) :: %Plug.Conn{} | {:error, :unauthorized}
  defp validate_password(%Plug.Conn{assigns: %{account: account}} = conn, password) do
    case Bcrypt.verify_pass(password, account.password_hash) do
      false -> ServerWeb.FallbackController.call(conn, {:error, :unauthorized})
      true -> conn
    end
  end

  @max_age 60 * 60 * 24 * 60
  @session_cookie sign: true, max_age: @max_age, same_site: "None", secure: true

  defp create_session(%Plug.Conn{assigns: %{account: account}} = conn) do
    case Server.Auth.create_session(account) do
      {:error, %Ecto.Changeset{} = changeset} -> ServerWeb.FallbackController.call(conn, {:error, changeset})
      {:ok, %Server.Auth.Session{} = session} ->
        conn
        |> put_resp_cookie("session_id", session.id, @session_cookie)
    end
  end

  def create(conn, params) do
    case validate(:create, params) do
      {:ok, %{email: email, password: password}} ->
        conn
        |> validate_email(email)
        |> validate_password(password)
        |> create_session()
        |> put_status(:ok)
        |> render(:show)

      {:error, changeset} ->
        {:error, changeset}
    end
  end

  defparams :create do
    required(:email, :string)
    required(:password, :string)
  end
end
