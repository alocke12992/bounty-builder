class AddToggleBooleansToSettings < ActiveRecord::Migration[5.1]
  def change
    add_column :settings, :infl_show, :boolean, default: false
    add_column :settings, :trans_show, :boolean, default: false
    add_column :settings, :video_show, :boolean, default: false
  end
end
