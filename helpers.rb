# You'll need to customize the following line. Replace the CONSUMER_KEY 
# and CONSUMER_SECRET with the values you got from Twitter 
# https://dev.twitter.com/apps/new).
use OmniAuth::Strategies::Twitter, '7RdGp1L2JBuft2VAghng', 'rJe7eHZbYsXOX0bhs8EP9AznxqhU8utU4OqyePZHJU'

# enable sessions
enable :sessions


helpers do
  def current_user
    @current_user ||= User.get(session[:user_id]) if session[:user_id]
  end
end
