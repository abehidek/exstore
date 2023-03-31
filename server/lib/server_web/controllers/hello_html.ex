defmodule ServerWeb.HelloHTML do
  use ServerWeb, :html

  embed_templates "hello_html/*"
end
