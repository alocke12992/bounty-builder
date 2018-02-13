class Api::ModeratorController < Api::ApiController
  before_action :ensure_admin

  def get_pending_rewards
    @rewards = Reward.where(moderator_approved: false).page(params[:page])
    render 'moderators/reward.json.jbuilder'
  end

  def approve_reward
    reward = Reward.find(params[:id])
    reward.update(moderator_approved: true)
    render json: 'success'
  end

  def revoke_reward
    reward = Reward.find(params[:id])
    reward.delete
  end

  def get_pending_submissions
    submissions = Submission.where(accepted: false)
    render json: submissions
  end

  def approve_submission
    submission = Submission.find(params[:id])
    submission.update(accepted: true)
    submission.user.rewards.create(
      value: params[:reward].to_i,
      reason: 'submission ' + submission.id.to_s + ' (' + submission.kind + ')',
      source: submission.kind,
      moderator_approved: true,
      submission: submission
    )
    render json: 'success'
  end

  def reject_submission
    submission = Submission.find(params[:id])
    submission.delete
    render json: 'success'
  end

  def get_pending_telegrams
    telegrams = Telegram.where(approved: false)
    render json: telegrams
  end

  def approve_telegram
    telegram = Telegram.find(params[:id])
    telegram.update(approved: true)
    telegram.user.rewards.create(
      value: 20,
      reason: 'telegram ' + telegram.id.to_s,
      source: 'telegram',
      moderator_approved: true
    )
    render json: 'success'
  end

  def reject_telegram
    telegram = Telegram.find(params[:id])
    telegram.delete
    render json: 'success'
  end

  def get_pending_discords
    discords = Discord.where(approved: false)
    render json: discords
  end

  def approve_discord
    discord = Discord.find(params[:id])
    discord.update(approved: true)
    discord.user.rewards.create(
      value: 20,
      reason: 'discord ' + discord.id.to_s,
      source: 'discord',
      moderator_approved: true
    )
    render json: 'success'
  end

  def reject_discord
    discord = Discord.find(params[:id])
    discord.delete
    render json: 'success'
  end

  private
  def ensure_admin
    unprocessable('Permission denied.') unless current_user.role == 'admin'
  end

end
