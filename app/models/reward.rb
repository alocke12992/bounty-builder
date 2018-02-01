class Reward < ApplicationRecord
  acts_as_paranoid
  belongs_to :user
  belongs_to :blog, optional: true
  has_one :post
end
