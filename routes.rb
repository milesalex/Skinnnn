# API ROUTES

use SassEngine
use Api


set :slim, :pretty => true

## AUTHENTICATION

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

# any of the following routes should work to sign the user in:
["/sign_in/?", "/signin/?", "/log_in/?", "/login/?", "/sign_up/?", "/signup/?"].each do |path|
  get path do
    redirect '/auth/twitter'
  end
end

# either /log_out, /logout, /sign_out, or /signout will end the session and log the user out
["/sign_out/?", "/signout/?", "/log_out/?", "/logout/?"].each do |path|
  get path do
    session[:user_id] = nil
    redirect '/'
  end
end

## CONTENT PAGES

get '/' do
  if current_user
    @current_user = current_user
  end
  home = User.new(name: "Skinnnn", nickname: "home", email: "hi@skinnnn.com",
                  bio: "Got Skinnnn?", city: "Berlin")

  # home.profile   = Profile.new(bio: "Got Skinnnn?", city: "Berlin")
  twitter_signup = Link.new(name: "Sign up with Twitter", url: "/sign_in")
  manifest       = Link.new(name: "Our Manifest", url: "/manifest")

  home.links = [ twitter_signup, manifest ]

  slim :profile, :locals => { user: home }
end

get '/people/?' do
  users = User.all
  slim :people, :locals => { users: users }
end


get '/:nickname/?' do
  if current_user
    @current_user = current_user
  end
  user = User.first(:nickname => params[:nickname])
  halt 404 if user.nil?
  if user.links.empty?
    twitter = Link.create(name: "Twitter", url: "http://twitter.com/mklappstuhl")
    dribble = Link.create(name: "Dribble", url: "http://dribbble.com/gabrielvaldivia")
    google = Link.create(name: "Google+", url: "https://plus.google.com/u/0/103892258076354730962")
    user.links = [ twitter, dribble, google ]
  end
  puts '@user'
  slim :profile, :locals => { user: user }
end


not_found do
  status 404
  slim :notfound
end
