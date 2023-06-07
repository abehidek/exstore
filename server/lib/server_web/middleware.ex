defmodule ServerWeb.Middleware do
  alias Server.Auth.UserSession

  defmodule Authentication do
    @behaviour Absinthe.Middleware
    def call(resolution, _) do
      case resolution.context.user_session do
        %UserSession{} ->
          resolution

        nil ->
          resolution
          |> Absinthe.Resolution.put_result({:error, "Session Not Found"})
      end
    end
  end
end
