class Api::RewardsController < ApplicationController
  def index
    render json: current_user.rewards.sum(:value)
  end

  def create
    case reward_params[:reason]
      when "Liked SVH on Facebook"
        current_user.rewards.create(reward_params) if current_user.rewards.where(reason: "Liked SVH on Facebook").count == 0
    end
    render json: "Success"
  end

  def source_points
    if current_user
      render json: current_user.rewards.where(source: params[:source]).sum(:value)
    end
  end

  private
  def reward_params
    params.require(:reward).permit(:value, :source, :reason)
  end
end
