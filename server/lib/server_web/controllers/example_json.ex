defmodule ServerWeb.ExampleJSON do
  alias Server.Examples.Example

  @doc """
  Renders a list of example.
  """
  def index(%{example: example}) do
    %{data: for(example <- example, do: data(example))}
  end

  @doc """
  Renders a single example.
  """
  def show(%{example: example}) do
    %{data: data(example)}
  end

  defp data(%Example{} = example) do
    %{
      id: example.id,
      title: example.title,
      body: example.body
    }
  end
end
