class Api::TwitterController < Api::ApiController
  def index
    render json: current_user.twitter ? current_user.twitter : ''
  end

  def create
    current_user.update(twitter: params[:twitter])
    #TODO error handling
    render json: current_user.twitter
  end
end
