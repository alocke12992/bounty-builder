class ConfirmationCodeMailer < ApplicationMailer
  default from: "noreply@deco.network"

  def confirmation_email(user)
    @user = user
    mail(to: @user.email, subject: 'Deconet Bounty Confirmation')
  end

  def confirmation_reminder_email(user)
    @user = user
    mail(to: @user.email, subject: 'Deconet Bounty Confirmation Reminder')
  end
end
