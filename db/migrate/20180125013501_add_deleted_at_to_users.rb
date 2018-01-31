class AddDeletedAtToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :deleted_at, :datetime
    add_index :users, :deleted_at
    add_column :telegrams, :deleted_at, :datetime
    add_index :telegrams, :deleted_at
    add_column :submissions, :deleted_at, :datetime
    add_index :submissions, :deleted_at
    add_column :rewards, :deleted_at, :datetime
    add_index :rewards, :deleted_at
    add_column :posts, :deleted_at, :datetime
    add_index :posts, :deleted_at
    add_column :discords, :deleted_at, :datetime
    add_index :discords, :deleted_at
  end
end
