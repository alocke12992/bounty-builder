class AddTranslatorToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :translator, :boolean, default: false
  end
end
