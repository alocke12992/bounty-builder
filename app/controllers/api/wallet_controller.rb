class Api::WalletController < Api::ApiController
  def index
    render json: current_user.wallet ? current_user.wallet : ''
  end

  def create
    if current_user.wallet == nil
      current_user.update(wallet: params[:wallet])
    end
    #TODO error handling
    render json: current_user.wallet
  end
end
