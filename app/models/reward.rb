class Reward < ApplicationRecord
  acts_as_paranoid
  belongs_to :user
  belongs_to :submission, optional: true
  has_one :post
end
