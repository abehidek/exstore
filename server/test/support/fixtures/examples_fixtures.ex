defmodule Server.ExamplesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Server.Examples` context.
  """

  @doc """
  Generate a example.
  """
  def example_fixture(attrs \\ %{}) do
    {:ok, example} =
      attrs
      |> Enum.into(%{
        body: "some body",
        title: "some title"
      })
      |> Server.Examples.create_example()

    example
  end
end
