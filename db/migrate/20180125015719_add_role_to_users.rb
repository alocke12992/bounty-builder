class AddRoleToUsers < ActiveRecord::Migration[5.1]
  def up
    add_column :users, :role, :string, default: 'user'
    User.update_all(role: 'user')
  end

  def down
    remove_column :users, :role
  end
end
