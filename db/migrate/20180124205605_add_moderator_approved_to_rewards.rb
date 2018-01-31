class AddModeratorApprovedToRewards < ActiveRecord::Migration[5.1]
  def change
    add_column :rewards, :moderator_approved, :boolean, default: false
  end
end
