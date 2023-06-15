<h1 align="center">
  <!-- <br> -->
  <!-- <img width="300" src="./apps/ets-s3/assets/logo.png" />
  <br> -->
  Exstore
  <br>
</h1>

<p align="center">
  <a href="#development">Development</a> •
  <a href="#license">License</a>
</p>

## Technologies/Stack

```sh
                           Front-end
   ┌───────────────────────────────┐
   │                               │
   │  React Native + TailwindCSS   │
   │                               │      Mobile Device
   │         Apollo Client         │
   │                               │
   └──────────┬───────▲────────────┘
              │       │
              │       │
              │       │
            GraphQL Schema
              │       │
┌─────────────┼───────┼─────────────────────────────────┐
│             │       │                                 │
│             │       │     Back-end                    │
│  ┌──────────▼───────┴────────────┐                    │
│  │                               │                    │
│  │                               │                    │
│  │  Elixir + Phoenix + Absinthe  │         Server     │
│  │                               │                    │
│  │                               │                    │
│  └──────────┬───────▲────────────┘                    │
│             │       │                                 │
│             │       │     Database                    │
│  ┌──────────▼───────┴────────────┐                    │
│  │                               │                    │
│  │                               │                    │
│  │          PostgreSQL           │                    │
│  │                               │                    │
│  │                               │                    │
│  └───────────────────────────────┘                    │
│                                                       │
└───────────────────────────────────────────────────────┘
```

## How to run it?

Be sure to have at least those dependencies installed:

- Docker w/ Docker Compose or PostgreSQL properly configured
- Node.js version 16 or above
- pnpm
- Elixir 1.14  + Erlang/OTP 25
- A properly configured Mobile development environment compatible with expo [See how to configure it here](https://reactnative.dev/docs/environment-setup)

or if you are using Nix with flakes enabled:

- Docker w/ Docker Compose or PostgreSQL properly configured
- A properly configured Mobile development environment compatible with expo [See how to configure it here](https://reactnative.dev/docs/environment-setup)

which can be done by pasting these lines into your `configuration.nix`:

```nix
programs.adb.enable = true;

virtualisation.docker.enable = true;
environment.systemPackages = with pkgs; [ docker-compose ];
users.users.<your-username>.extraGroups = [ "docker" "adbusers" ];
```

then after cloning repo:

```sh
git clone https://github.com/abehidek/exstore

$ cd exstore

# Use cachix if you want all dependencies builded
$ nix shell nixpkgs#cachix
$ cachix use exstore

$ nix develop # if Nix is installed

# or if you are using direnv
$ direnv allow
```


### If you are using Android connected w/ cable
```sh
# first, install ADB on your operating system
# See https://www.xda-developers.com/install-adb-windows-macos-linux/

# Verify if it's installed
$ adb --version
Android Debug Bridge version 1.0.41
Version 34.0.0-android-tools

# Connect phone to PC, run to start the daemon and a alert will appear to allow on your phone
$ adb devices

# Forward port 4000 from your PC to port 4000 on Android
$ adb reverse tcp:4000 tcp:4000
```

### Running the project

#### Server
```sh
$ cd server

# If you have Docker and Docker Compose run this
$ docker compose -f docker-compose.dev.yml up -d # this will run postgres and a database client

# If you are using PostgreSQL baremetal, open the file ./server/config/dev.exs and change the database configuration

# Install dependencies
$ mix deps.get

# Setup database
$ mix ecto.reset

# Run server
$ mix phx.server
```

#### Mobile
```sh
$ cd mobile

# Install dependencies
$ pnpm i

# Run development server for React Native
$ pnpm start --localhost # pass localhost if you are connecting your device
```

## Requirements

- Authentication
- User authorization (Admin, Customer and shipper)

- Admin CRUD products (quantity, categories and photos included)
- Customer can add products to cart and buy
- Shipper takes orders and ship product
- Customer can see all orders and it's details (status and location)

## Helpful sources

- [Phoenix cli tasks](https://hexdocs.pm/phoenix/Mix.Tasks.Local.Phx.html)
- [Ecto as data wrapper store (Changeset, Query and Repo)](https://hexdocs.pm/ecto/Ecto.html)
- [Ecto SQL adapter (Migrations)](https://hexdocs.pm/ecto_sql/Ecto.Adapters.SQL.html)
- [Phoenix ecto](https://hexdocs.pm/phoenix/ecto.html)

- [React Navigation TypeScript](https://reactnavigation.org/docs/typescript/#type-checking-screens)
- [React Navigation Drawer](https://reactnavigation.org/docs/drawer-based-navigation/)

## License

```
MIT License

Copyright (c) 2023 ETS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

> [abehidek.me](https://abehidek.me) &nbsp;&middot;&nbsp;
> GitHub [@abehidek](https://github.com/abehidek) &nbsp;&middot;&nbsp;
> Twitter [@guilhermehabe](https://twitter.com/guilhermehabe)
