class Reward < ApplicationRecord
  acts_as_paranoid
  belongs_to :user
  belongs_to :submission, optional: true
  belongs_to :post, optional: true
end
