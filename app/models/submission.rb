class Submission < ApplicationRecord
  belongs_to :user
  validates_presence_of :url
  validates_presence_of :kind
end
