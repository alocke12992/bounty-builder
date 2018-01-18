class Api::InfluencerController < Api::ApiController
  def index
    render json: current_user.influencer ? current_user.influencer : ''
  end

  def create
    current_user.update(influencer: params[:influencer])
    #TODO error handling
    render json: current_user.influencer
  end
end
