class Api::LinkedinController < Api::ApiController
  def index
    render json: current_user.linkedin ? current_user.linkedin : ''
  end

  def create
    current_user.update(linkedin: params[:linkedin])
    #TODO error handling
    render json: current_user.linkedin
  end
end
