class Api::DiscordController < Api::ApiController
  def index
    render json: current_user.discord ? current_user.discord : ''
  end

  def create
    current_user.update(discord: params[:discord])
    #TODO error handling
    render json: current_user.discord
  end
end
