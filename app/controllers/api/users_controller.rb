class Api::UsersController < ApplicationController
  def total_user_count
    render json: User.count
  end
end
