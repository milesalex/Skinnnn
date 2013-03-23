# API ROUTES

use SassEngine
use Authentication
use Api


set :slim, :pretty => true

## CONTENT PAGES

get '/' do
  if current_user
    @current_user = current_user
  end
  home = User.new(name: "Skinnnn", nickname: "home", email: "hi@skinnnn.com",
                  bio: "A minimal about me application", city: "Berlin")

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
