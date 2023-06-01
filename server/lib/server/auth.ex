defmodule Server.Auth do
  @moduledoc """
  The Auth context.
  """

  import Ecto.Query, warn: false
  alias Server.Repo

  alias Server.Auth.User
  alias Server.Auth.UserSession

  # @doc """
  # Returns the list of users.

  # ## Examples

  #     iex> list_users()
  #     [%User{}, ...]

  # """

  # def list_users do
  #   Repo.all(User)
  # end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by_email(email) when is_binary(email) do
    Repo.get_by(User, email: email)
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  @doc """
  Returns an `%UserSession{}`

  Returns nil if the User Session does not exists
  """

  @spec get_user_session_by_token(String.t()) :: %UserSession{} | nil
  def get_user_session_by_token(token) do
    Repo.get_by(UserSession, token: token)
  end

  def create_user_session(attrs \\ %{}) do
    %UserSession{}
    |> UserSession.create_changeset(attrs)
    |> Repo.insert()
  end

  def delete_user_session(%UserSession{} = user_session), do: Repo.delete(user_session)

  def verify_user(%{email: email, password: password})
      when is_binary(email) and is_binary(password) do
    with %User{} = user <- get_user_by_email(email),
         true <- User.valid_password?(user, password) do
      {:ok, user}
    else
      nil ->
        {:error, "User email or password wrong"}

      false ->
        {:error, "User email or password wrong"}

      _ ->
        {:error, "Internal server error"}
    end
  end
end
