defmodule ServerWeb.Router do
  use ServerWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :graphql do
    plug ServerWeb.Context
  end

  scope "/api", ServerWeb do
    pipe_through :api
  end

  scope "/graphql" do
    pipe_through :graphql

    forward "/", Absinthe.Plug, schema: ServerWeb.Schema
  end

  if Mix.env() == :dev do
    scope "/graphiql" do
      pipe_through :graphql

      forward "/", Absinthe.Plug.GraphiQL,
        schema: ServerWeb.Schema,
        interface: :playground
    end
  end

  # Enable LiveDashboard in development
  if Application.compile_env(:server, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: ServerWeb.Telemetry
    end
  end
end
