class AddLiveStreamToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :live_stream_confirmed, :boolean, default: false
  end
end
