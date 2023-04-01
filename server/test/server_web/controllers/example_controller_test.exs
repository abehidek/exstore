defmodule ServerWeb.ExampleControllerTest do
  use ServerWeb.ConnCase

  import Server.ExamplesFixtures

  alias Server.Examples.Example

  @create_attrs %{
    body: "some body",
    title: "some title"
  }
  @update_attrs %{
    body: "some updated body",
    title: "some updated title"
  }
  @invalid_attrs %{body: nil, title: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all example", %{conn: conn} do
      conn = get(conn, ~p"/api/example")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create example" do
    test "renders example when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/example", example: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/example/#{id}")

      assert %{
               "id" => ^id,
               "body" => "some body",
               "title" => "some title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/example", example: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update example" do
    setup [:create_example]

    test "renders example when data is valid", %{conn: conn, example: %Example{id: id} = example} do
      conn = put(conn, ~p"/api/example/#{example}", example: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/example/#{id}")

      assert %{
               "id" => ^id,
               "body" => "some updated body",
               "title" => "some updated title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, example: example} do
      conn = put(conn, ~p"/api/example/#{example}", example: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete example" do
    setup [:create_example]

    test "deletes chosen example", %{conn: conn, example: example} do
      conn = delete(conn, ~p"/api/example/#{example}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/example/#{example}")
      end
    end
  end

  defp create_example(_) do
    example = example_fixture()
    %{example: example}
  end
end
