class Api::ConfirmationsController < ApplicationController
  def resend_confirmation_email
    ConfirmationCodeMailer.confirmation_email(current_user).deliver
    render json: "message sent"
  end

  def verify_confirmation
    if params[:confirmation_code] == current_user.confirmation_code
      current_user.update(confirmed: true)
      render json: current_user
    else
      unprocessable("Code incorrect")
    end
  end

  # def send_reminders
    # User.where(confirmed: false).each do |user|
    #   ConfirmationCodeMailer.confirmation_reminder_email(user).deliver
    # end
  # end
end
