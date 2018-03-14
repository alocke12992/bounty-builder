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

  after_create :invite_code, :confirmation

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names
      all.each do |result|
        csv << result.attributes.values_at(*column_names)
      end
    end
  end

  def self.from_oauth(provider, data, token, state)
    user = User.find_or_initialize_by(email: data["email"])

    if user.persisted?
      unless user.provider == provider
        return false
      end
      user.update(api_token: token)
    else
      user.name = data["username"]
      user.provider = provider
      user.api_token = token
      user.uid = data["id"]
      user.password = SecureRandom.hex
      user.confirmed = true
      if state[:invite_code] && state[:invite_code] != ''
        user.incoming_invite_code = state[:invite_code]
      end
    end

    user
  end

  private
  def invite_code
    if self.incoming_invite_code
      inviter = User.find_by(outgoing_invite_code: self.incoming_invite_code)
      if inviter
        inviter.rewards.create(value: 50, source: 'invitation', reason: "Invited user [#{self.id}].", moderator_approved: true)
        self.rewards.create(value: 50, source: 'invitation', reason: 'User joined by invitation code from [#{inviter.id}].', moderator_approved: true)
      end
    end
    self.outgoing_invite_code = SecureRandom.uuid
  end

  def confirmation
    o = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
    self.confirmation_code = (0...8).map { o[rand(o.length)] }.join
    if self.provider == "email"
      ConfirmationCodeMailer.confirmation_email(self).deliver
    end
  end
end
