class Submission < ApplicationRecord
  acts_as_paranoid
  belongs_to :user
  validates_presence_of :url
  validates_presence_of :kind
end
