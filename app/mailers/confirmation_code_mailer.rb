class ConfirmationCodeMailer < ApplicationMailer
  default from: "noreply@simplyvitalhealth.com"

  def confirmation_email(user)
    @user = user
    mail(to: @user.email, subject: 'Simply Vital Health Bounty Confirmation')
  end

  def confirmation_reminder_email(user)
    @user = user
    mail(to: @user.email, subject: 'Simply Vital Health Bounty Confirmation Reminder')
  end
end
