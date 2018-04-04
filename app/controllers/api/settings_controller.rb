class Api::SettingsController < ApplicationController
  before_action :set_setting, only: [:update, :update_logo]

  def index 
    render json: Setting.current
  end

  def update_logo
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    file = params[:file]
    begin
      ext = File.extname(file.tempfile)
      obj = s3.bucket(s3_bucket).object("logos/#{@setting.id}#{ext}")
      obj.upload_file(file.tempfile, acl: 'public-read')
      @setting.logo_url = obj.public_url
      if @setting.save
        render json: @setting
      else 
        render json: { errors: @setting.errors.full_messages }, status: 422
      end 
    rescue => e 
      render json: {errors: e}, status: 422
    end 
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
        :button_color,
        :video_contest,
        :facebook,
        :twitter,
        :linkedin,
        :reddit
      )
  end 

end