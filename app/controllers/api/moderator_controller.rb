class Api::ModeratorController < Api::ApiController
  def get_pending_rewards
    if (current_user.role == 'admin' || current_user.role == 'moderator')
      @rewards = Reward.where(moderator_approved: false)
      render 'moderators/reward.json.jbuilder'
    end
  end

  def approve_reward
    if (current_user.role == 'admin' || current_user.role == 'moderator')
      reward = Reward.find(params[:id])
      reward.update(moderator_approved: true)
      reward.save!
      render json: 'success'
    end
  end

end
