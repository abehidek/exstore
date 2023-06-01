defmodule ServerWeb.Schema.Error do
  alias Crudry.Translator
  alias Crudry.Middlewares.TranslateErrors

  def error_payload(%Ecto.Changeset{} = changeset),
    do: TranslateErrors.handle_error(changeset, Translator, Gettext.get_locale(Translator))
end
