class AddIsInfluencerToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :is_influencer, :boolean, default: false
  end
end
