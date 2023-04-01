defmodule ServerWeb.ExampleController do
  use ServerWeb, :controller

  alias Server.Examples
  alias Server.Examples.Example

  action_fallback ServerWeb.FallbackController

  def index(conn, _params) do
    example = Examples.list_example()
    render(conn, :index, example: example)
  end

  def create(conn, %{"example" => example_params}) do
    with {:ok, %Example{} = example} <- Examples.create_example(example_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/example/#{example}")
      |> render(:show, example: example)
    end
  end

  def show(conn, %{"id" => id}) do
    example = Examples.get_example!(id)
    render(conn, :show, example: example)
  end

  def update(conn, %{"id" => id, "example" => example_params}) do
    example = Examples.get_example!(id)

    with {:ok, %Example{} = example} <- Examples.update_example(example, example_params) do
      render(conn, :show, example: example)
    end
  end

  def delete(conn, %{"id" => id}) do
    example = Examples.get_example!(id)

    with {:ok, %Example{}} <- Examples.delete_example(example) do
      send_resp(conn, :no_content, "")
    end
  end
end
