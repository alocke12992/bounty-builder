class AddInviteCodeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :incoming_invite_code, :string
    add_column :users, :outgoing_invite_code, :string
  end
end
