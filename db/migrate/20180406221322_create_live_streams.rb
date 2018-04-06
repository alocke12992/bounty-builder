class CreateLiveStreams < ActiveRecord::Migration[5.1]
  def change
    create_table :live_streams do |t|
      t.string :code

      t.timestamps
    end
  end
end
