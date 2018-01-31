class RemoveTelegramFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :telegram
  end
end
