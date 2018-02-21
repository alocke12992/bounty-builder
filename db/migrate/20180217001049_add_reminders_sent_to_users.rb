class AddRemindersSentToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :reminders_sent, :integer, default: 0
  end
end
