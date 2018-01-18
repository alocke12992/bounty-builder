class AddFieldsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :facebook, :string
    add_column :users, :twitter, :string
    add_column :users, :linkedin, :string
    add_column :users, :reddit, :string
    add_column :users, :blog, :string
    add_column :users, :influencer, :string
    add_column :users, :telegram, :string
    add_column :users, :discord, :string
  end
end
