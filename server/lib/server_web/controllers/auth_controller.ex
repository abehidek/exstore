defmodule ServerWeb.AuthController do
  use ServerWeb, :controller

  plug ServerWeb.Plugs.Authenticate when action in [:show]

  def show(conn, _params) do
    conn
    |> put_status(:ok)
    |> json(%{message: "Succesfully retrieved user"})
  end

  def create(conn, %{"email" => email, "password" => password}) do
    IO.inspect(email)
    IO.inspect(password)

    conn
    |> put_status(:ok)
    |> json(%{message: "Succesfully logged in"})
  end
end
