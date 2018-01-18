class Api::TelegramController < Api::ApiController
  def index
    render json: current_user.telegram ? current_user.telegram : ''
  end

  def create
    current_user.update(telegram: params[:telegram])
    #TODO error handling
    render json: current_user.telegram
  end
end
