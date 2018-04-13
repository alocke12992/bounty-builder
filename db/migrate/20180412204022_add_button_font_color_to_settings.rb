class AddButtonFontColorToSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :settings, :theme_button_font_color, :string, default: '#000000'
  end
end
