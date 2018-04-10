class AddTranslationIsTranslatorToSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :settings, :is_translator, :text, default: ""
    add_column :settings, :not_translator, :text, default: ""
  end
end
