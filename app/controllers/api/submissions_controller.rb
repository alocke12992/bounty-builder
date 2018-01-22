class Api::SubmissionsController < ApplicationController
  def index
    render json: current_user.submissions.where(kind: params[:kind]).order(created_at: :desc)
  end

  def create
    submission = current_user.submissions.create(url: submission_params[:url], kind: submission_params[:kind])
    render json: submission
  end

  def update
  end

  private
  def submission_params
    params.require(:submission).permit(:url, :accepted, :kind)
  end
end
