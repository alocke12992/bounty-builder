class Api::LiveStreamsController < ApplicationController
  before_action :verify_admin, only: [:update]

  def index
    render json: LiveStream.current
  end

  def update
    live_stream = LiveStream.current
    if live_stream.update(live_stream_params)
      head :ok
    else
      unprocessable("An error occured")
    end
  end

  def confirm_live_stream_code
    if params[:code] == LiveStream.current.code
      current_user.update(live_stream_confirmed: true)
      render json: current_user
    else
      unprocessable("Incorrect")
    end
  end

  private
  def live_stream_params
    params.require(:live_stream).permit(:code)
  end

  def verify_admin
    unprocessable("not allowed") unless current_user.role == "admin"
  end
end
