class Api::RewardsController < ApplicationController
  def index
    render json: current_user.rewards
  end

  def create
    daily_rewards_count = current_user.rewards.where(
      "created_at >= ? and source != ? and source != ? and source != ? and source != ? and source != ?",
      Time.zone.now.beginning_of_day,
      "invitation",
      "translation",
      "influencer",
      "telegram",
      "discord"
      ).count
    if daily_rewards_count < 2
      reward = current_user.rewards.create(reward_params)
      if params[:post_id]
        reward.post = Post.find(params[:post_id])
      end
      render json: reward
    else
      render json: { errors: "Only 2 Posts Allowed Per Day" }, status: 422
    end
  end

  def source_points
    render json: current_user.rewards.where(source: params[:source]).sum(:value)
  end

  private
  def reward_params
    params.require(:reward).permit(:value, :source, :reason, :post_id)
  end
end
