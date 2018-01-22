Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :wallet, only: [:index, :create]
    resources :facebook, only: [:index, :create]
    resources :twitter, only: [:index, :create]
    resources :linkedin, only: [:index, :create]
    resources :reddit, only: [:index, :create]
    resources :blog, only: [:index, :create]
    resources :influencer, only: [:index, :create]
    resources :telegram, only: [:index, :create]
    resources :discord, only: [:index, :create]
    resources :rewards, only: [:index, :create]
    resources :submissions, only: [:index, :create, :update]
    match "rewards/source_points" => "rewards#source_points", :via => :get, :as => :source_points
    match "users/total_user_count" => "users#total_user_count", :via => :get, :as => :total_user_count
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
