class Authentication < Sinatra::Base

  get '/auth/:name/callback' do
    auth = request.env["omniauth.auth"]
    user = User.first_or_create({ :uid => auth["uid"]},
                  { :uid => auth["uid"],
                    :nickname => auth["info"]["nickname"],
                    :name => auth["info"]["name"],
                    :created_at => Time.now })
    session[:user_id] = user.id
    redirect "/#{user.nickname}"
  end

  ["/sign_in/?", "/signin/?", "/log_in/?", "/login/?", "/sign_up/?", "/signup/?"].each do |path|
    get path do
      redirect '/auth/twitter'
    end
  end

  ["/sign_out/?", "/signout/?", "/log_out/?", "/logout/?"].each do |path|
    get path do
      session[:user_id] = nil
      redirect '/'
    end
  end

  get '/auth/current_user' do
    user = User.get(session[:user_id])
    user.to_json
  end


end
