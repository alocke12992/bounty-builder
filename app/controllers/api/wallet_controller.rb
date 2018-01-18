class Api::WalletController < Api::ApiController
  def index
    render json: current_user.wallet
  end

  def create
    current_user.update(wallet: params[:wallet])
    #TODO error handling
    render json: current_user.wallet
  end
end
