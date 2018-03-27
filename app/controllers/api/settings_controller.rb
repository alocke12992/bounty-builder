class Api::SettingsController < ApplicationController

  def index 
    settings = Setting.all.first
    render json: settings
  end

  def update
  end

end
