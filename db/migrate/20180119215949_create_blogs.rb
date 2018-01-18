class CreateBlogs < ActiveRecord::Migration[5.1]
  def change
    create_table :blogs do |t|
      t.string :url
      t.boolean :accepted, default: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
