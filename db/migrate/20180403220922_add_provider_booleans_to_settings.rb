class AddProviderBooleansToSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :settings, :facebook, :boolean, default: false
    add_column :settings, :twitter, :boolean, default: false
    add_column :settings, :linkedin, :boolean, default: false
    add_column :settings, :reddit, :boolean, default: false
  end
end
