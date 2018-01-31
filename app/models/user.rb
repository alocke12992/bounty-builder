class User < ActiveRecord::Base
  acts_as_paranoid
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :rewards, dependent: :destroy
  has_many :submissions, dependent: :destroy
  has_one :telegram
  has_one :discord

  after_create :invite_code

  private
  def invite_code
    if self.incoming_invite_code
      inviter = User.where(outgoing_invite_code: self.incoming_invite_code).first
      if inviter
        inviter.rewards.create(value: 50, source: 'invitation', reason: 'Invited user to bounty program.', moderator_approved: true)
        self.rewards.create(value: 50, source: 'invitation', reason: 'User joined by invitation code.', moderator_approved: true)
      end
    end
    self.outgoing_invite_code = SecureRandom.uuid
  end
end
