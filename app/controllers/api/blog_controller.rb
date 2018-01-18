class Api::BlogController < Api::ApiController
  def index
    render json: current_user.blog ? current_user.blog : ''
  end

  def create
    current_user.update(blog: params[:blog])
    #TODO error handling
    render json: current_user.blog
  end
end
