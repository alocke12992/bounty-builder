class AddRewardIdToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :reward_id, :integer
  end
end
