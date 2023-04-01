defmodule Server.Examples do
  @moduledoc """
  The Examples context.
  """

  import Ecto.Query, warn: false
  alias Server.Repo

  alias Server.Examples.Example

  @doc """
  Returns the list of example.

  ## Examples

      iex> list_example()
      [%Example{}, ...]

  """
  def list_example do
    Repo.all(Example)
  end

  @doc """
  Gets a single example.

  Raises `Ecto.NoResultsError` if the Example does not exist.

  ## Examples

      iex> get_example!(123)
      %Example{}

      iex> get_example!(456)
      ** (Ecto.NoResultsError)

  """
  def get_example!(id), do: Repo.get!(Example, id)

  @doc """
  Creates a example.

  ## Examples

      iex> create_example(%{field: value})
      {:ok, %Example{}}

      iex> create_example(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_example(attrs \\ %{}) do
    %Example{}
    |> Example.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a example.

  ## Examples

      iex> update_example(example, %{field: new_value})
      {:ok, %Example{}}

      iex> update_example(example, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_example(%Example{} = example, attrs) do
    example
    |> Example.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a example.

  ## Examples

      iex> delete_example(example)
      {:ok, %Example{}}

      iex> delete_example(example)
      {:error, %Ecto.Changeset{}}

  """
  def delete_example(%Example{} = example) do
    Repo.delete(example)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking example changes.

  ## Examples

      iex> change_example(example)
      %Ecto.Changeset{data: %Example{}}

  """
  def change_example(%Example{} = example, attrs \\ %{}) do
    Example.changeset(example, attrs)
  end
end
