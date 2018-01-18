class Api::RedditController < Api::ApiController
  def index
    render json: current_user.reddit ? current_user.reddit : ''
  end

  def create
    current_user.update(reddit: params[:reddit])
    #TODO error handling
    render json: current_user.reddit
  end
end
