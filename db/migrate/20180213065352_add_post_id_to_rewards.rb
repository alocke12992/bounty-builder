class AddPostIdToRewards < ActiveRecord::Migration[5.1]
  def change
    add_reference :rewards, :post, foreign_key: true
  end
end
