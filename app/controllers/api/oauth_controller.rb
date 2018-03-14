class Api::OauthController < ApplicationController
  def create
    @state = JSON.parse(params[:state], {:symbolize_names=>true}) unless !params[:state]

    @result = HTTParty.post("https://app.deco.network/oauth/token",
      :body => { :code => params[:code],
                 :client_id => '2d6dbffdce9d62562f2fe8c0be2a0284bdc36b71fda2bc4600372810fa68e5bd',
                 :client_secret => ENV['DECONET_SECRET'],
                 :redirect_uri => "http://localhost:3000/auth/Deconet/callback",
                 :grant_type => "authorization_code"
                }.to_json,
      :headers => { 'Content-Type' => 'application/json' } )

    @info = HTTParty.get("https://app.deco.network/v1/users/me",
      :headers => {
        "Authorization" => "Bearer " + @result.parsed_response["access_token"]
      })

    user = User.from_oauth('deconet', @info.parsed_response, @result.parsed_response, @state)
    if user
      sign_in(user)

      client_id = SecureRandom.urlsafe_base64(nil, false)
      token     = SecureRandom.urlsafe_base64(nil, false)
      user.tokens[client_id] = {
        token: BCrypt::Password.create(token),
        expiry: (Time.now + DeviseTokenAuth.token_lifespan).to_i
      }
      user.save

      new_auth_header = user.build_auth_header(token, client_id)
      response.headers.merge!(new_auth_header)

      render json: user
    else
      unprocessable("User already exists.")
    end
  end
end
