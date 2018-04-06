class AddMoreDefaultValuesToSettings < ActiveRecord::Migration[5.1]
  def change
    change_column :settings, :logo_url, :string, default: ""
    change_column :settings, :primary_color, :string, default: ""
    change_column :settings, :button_color, :string, default: ""
    change_column :settings, :video_contest, :text, default: ""
  end
end
