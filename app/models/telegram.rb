class Telegram < ApplicationRecord
  acts_as_paranoid
  belongs_to :user
  validates_presence_of :username
end
