class ApplicationController < ActionController::API
  include ActionController::ImplicitRender
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?

  def unprocessable(errors)
    render json: { errors: errors }, status: :unprocessable_entity
  end
  
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:incoming_invite_code])
  end

end
