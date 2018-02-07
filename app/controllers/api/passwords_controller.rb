class Api::PasswordsController < ApplicationController
  def send_password_reset
    if User.exists?(email: params[:email])
      user = User.find_by email: params[:email]
      user.send_reset_password_instructions
    end
  end

  def set_new_password
    user = User.with_reset_password_token(params[:token])
    if user && user.reset_password(params[:password], params[:passwordConfirmation])
      render json: 'Password changed successfully. Please sign in.'
    else
      unprocessable('Error changing password. Try again')
    end
  end
end
