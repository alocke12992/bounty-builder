class Api::FacebookController < Api::ApiController
  def index
    render json: current_user.facebook ? current_user.facebook  : ''
  end

  def create
    current_user.update(facebook: params[:facebook])
    #TODO error handling
    render json: current_user.facebook
  end
end
