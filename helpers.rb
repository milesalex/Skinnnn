# You'll need to customize the following line. Replace the CONSUMER_KEY 
# and CONSUMER_SECRET with the values you got from Twitter 
# https://dev.twitter.com/apps/new).
use OmniAuth::Strategies::Twitter, '7RdGp1L2JBuft2VAghng', 'rJe7eHZbYsXOX0bhs8EP9AznxqhU8utU4OqyePZHJU'

# enable sessions
enable :sessions

helpers do

  # Is user currently logged in
	def current_user
		@current_user ||= User.get(session[:user_id]) if session[:user_id]
	end

  # Redirect to last page or root
  def redirect_last
    if session[:redirect_to]
      redirect_url = session[:redirect_to]
      session[:redirect_to] = nil
      redirect redirect_url
    else
      redirect "/"
    end  
  end

  # Transforms the request body into JSON.
  def json_data
    JSON.parse(request.body.read)
  end
    
end
