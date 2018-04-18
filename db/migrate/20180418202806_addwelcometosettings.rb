class Addwelcometosettings < ActiveRecord::Migration[5.1]
  def change
    add_column :settings, :welc_body, :text, default: ""
  end
end
