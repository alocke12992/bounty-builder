class Api::SettingsController < ApplicationController
  before_action :set_setting, only: [:update]

  def index 
    settings = Setting.all.first
    render json: settings
  end

  def update
    if @setting.update(setting_params)
      render json: @setting
    else 
      render json: {errors: @setting.errors.full_messages.join(',') }, status: 422
    end 
  end


  private 

  def set_setting
    @setting = Setting.find(params[:id])
  end 

  def setting_params
      params.require(:settings).permit(
        :dash_description, 
        :regulations, 
        :num_users, 
        :num_shares, 
        :telegram, 
        :invitation_link, 
        :telegram_invite, 
        :etherium,
        :provider_social_media, 
        :provider_rules, 
        :rules_main,
        :influencer_rules,
        :influencer_shares,
        :influencer_link, 
        :translation_rules,
        :translation_link, 
        :logo_url, 
        :primary_color,
      )
  end 

end