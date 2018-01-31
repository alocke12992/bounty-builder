class Api::TelegramController < Api::ApiController
  def index
    render json: current_user.telegram
  end

  def create
    telegram = Telegram.create(username: telegram_params[:username])
    current_user.telegram = telegram
    #TODO error handling
    render json: current_user.telegram
  end

  private
  def telegram_params
    params.require(:telegram).permit(:username, :approved)
  end
end
