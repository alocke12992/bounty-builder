Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :wallet, only: [:index, :create]
    post '/twitter', to: 'twitter#index'
    match "/twitter/reverse" => "twitter#reverse", via: [:options]
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
