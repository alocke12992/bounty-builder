class DropPost < ActiveRecord::Migration[5.1]
  def down 
    drop_table :posts
  end
end
