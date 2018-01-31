class CreateTelegrams < ActiveRecord::Migration[5.1]
  def change
    create_table :telegrams do |t|
      t.references :user, foreign_key: true
      t.string :username
      t.boolean :approved, default: false

      t.timestamps
    end
  end
end
