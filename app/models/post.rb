class Post < ApplicationRecord
  acts_as_paranoid
  has_many :rewards
end
