class Api::BlogsController < ApplicationController
  def index
    render json: current_user.blogs.order(created_at: :desc)
  end

  def create
    blog = current_user.blogs.create(url: blog_params[:url])
    render json: blog
  end

  def update
  end

  private
  def blog_params
    params.require(:blog).permit(:url, :accepted)
  end
end
