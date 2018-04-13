class AddThemeButtonBorderColorToSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :settings, :theme_button_border_color, :string, default: ''
  end
end
