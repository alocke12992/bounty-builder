class AddSubmissionIdToReward < ActiveRecord::Migration[5.1]
  def change
    add_reference :rewards, :submission, foreign_key: true
  end
end
