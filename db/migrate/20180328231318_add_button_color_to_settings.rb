class AddButtonColorToSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :settings, :button_color, :string, default: '#50e3c2'
  end
end
