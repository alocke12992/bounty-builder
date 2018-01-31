class Api::PostsController < Api::ApiController
  def index
    render json: Post.where(kind: params[:kind]).order(created_at: :desc)
  end

  def create
    if current_user.role === 'admin'
      Post.create(post_params)
    end
  end

  def update
  end

  private
  def post_params
    params.require(:post).permit(:url, :kind)
  end
end
