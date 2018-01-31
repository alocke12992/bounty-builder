class AddBlockedToUsers < ActiveRecord::Migration[5.1]
  def up
    add_column :users, :blocked, :boolean, default: false
    User.update_all(blocked: false)
  end

  def down
    remove_column :users, :blocked
  end
end
