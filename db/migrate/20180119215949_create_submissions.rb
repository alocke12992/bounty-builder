class CreateSubmissions < ActiveRecord::Migration[5.1]
  def change
    create_table :submissions do |t|
      t.string :url
      t.boolean :accepted, default: false
      t.references :user, foreign_key: true
      t.string :kind

      t.timestamps
    end
  end
end
