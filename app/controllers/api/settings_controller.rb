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
      obj = s3.bucket(s3_bucket).object("logos/#{file.original_filename}")
      obj.upload_file(file.tempfile, acl: 'public-read')
      @setting.theme_logo = obj.public_url
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
        :dash_overview, 
        :dash_users, 
        :dash_tokens, 
        :dash_invitation_link, 
        :dash_telegram,
        :dash_telegram_disc_link,
        :dash_telegram_anno_link, 
        :dash_ethereum, 
        :prov_social_media, 
        :prov_action_warning,
        :rules_about, 
        :infl_submission, 
        :infl_bounties,
        :infl_link,
        :infl_show,
        :trans_rules,
        :trans_link, 
        :trans_show,
        :theme_logo,
        :theme_nav_color, 
        :theme_button_color, 
        :theme_button_font_color,
        :theme_button_border_color,
        :video_rules,
        :video_show,
        :video_link,
        :prov_facebook,
        :prov_twitter,
        :prov_linkedin,
        :prov_reddit,
        :prov_facebook_link,
        :prov_twitter_link,
        :prov_linkedin_link,
        :prov_reddit_link
      )
  end 

end