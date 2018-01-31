class Api::DiscordController < Api::ApiController
  def index
    render json: current_user.discord
  end

  def create
    discord = Discord.create(username: discord_params[:username])
    current_user.discord = discord
    #TODO error handling
    render json: current_user.discord
  end

  private
  def discord_params
    params.require(:discord).permit(:username, :approved)
  end
end
