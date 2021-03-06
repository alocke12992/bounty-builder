Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :blog, only: [:index, :create]
    resources :discord, only: [:index, :create]
    resources :facebook, only: [:index, :create]
    resources :influencer, only: [:index, :create]
    resources :linkedin, only: [:index, :create]
    resources :posts, only: [:index, :create, :update]
    resources :reddit, only: [:index, :create]
    resources :rewards, only: [:index, :create]
    resources :settings, only: [:index, :update]
    resources :submissions, only: [:index, :create, :update]
    resources :telegram, only: [:index, :create]
    resources :twitter, only: [:index, :create]
    resources :wallet, only: [:index, :create]

    match "rewards/source_points" => "rewards#source_points", :via => :get, :as => :source_points
    match "users/total_user_count" => "users#total_user_count", :via => :get, :as => :total_user_count

    #Moderator Actions
    match "moderator/get_pending_rewards" => "moderator#get_pending_rewards", :via => :get, :as => :get_pending_rewards
    match "moderator/approve_reward" => "moderator#approve_reward", :via => :post, :as => :approve_reward
    post 'moderator/revoke_reward', to: 'moderator#revoke_reward'
    get 'moderator/get_pending_submissions', to: 'moderator#get_pending_submissions'
    post 'moderator/approve_submission', to: 'moderator#approve_submission'
    post 'moderator/reject_submission', to: 'moderator#reject_submission'
    get 'moderator/get_pending_telegrams', to: 'moderator#get_pending_telegrams'
    post 'moderator/approve_telegram', to: 'moderator#approve_telegram'
    post 'moderator/approve_all_telegrams', to: 'moderator#approve_all_telegrams'
    post 'moderator/reject_telegram', to: 'moderator#reject_telegram'
    get 'moderator/get_pending_discords', to: 'moderator#get_pending_discords'
    post 'moderator/approve_discord', to: 'moderator#approve_discord'
    post 'moderator/reject_discord', to: 'moderator#reject_discord'
    post 'moderator/add_translator', to: 'moderator#add_translator'
    post 'moderator/add_influencer', to: 'moderator#add_influencer'
    get 'moderator/generate_csv', to: 'moderator#generate_csv'

    #Password Recovery
    post 'passwords/send_password_reset', to: 'passwords#send_password_reset'
    post 'passwords/set_new_password', to: 'passwords#set_new_password'

    #Confirmation Codes
    post 'confirmations/verify_confirmation', to: 'confirmations#verify_confirmation'
    get 'confirmations/resend_confirmation_email', to: 'confirmations#resend_confirmation_email'

    #oauth
    post '/oauth', to: 'oauth#create'

    #logo 
    put '/settings/:id/update_logo', to: 'settings#update_logo'

    #live stream
    resources :live_streams, only: [:index, :update]
    post '/confirm_live_stream_code', to: 'live_streams#confirm_live_stream_code'
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
