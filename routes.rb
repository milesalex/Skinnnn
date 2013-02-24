# API ROUTES

before '/api*' do
  content_type 'application/json'
end

get '/api/users' do
  users = User.all
  users.to_json
end

get '/api/user/:id' do
  user = User.get(params[:id])
  user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
end

get '/api/user/:nickname' do
  # curently in use
  user = User.first(:nickname => params[:nickname]);
  user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
end

put '/api/user/:id/?' do 
  user = User.get(params[:id])
  user.update(params)
  user.to_json
end

get '/api/auth/logged_in' do
  if current_user
    status 200
  else
    status 400
  end
end


## AUTHENTICATION

get '/auth/:name/callback' do
  auth = request.env["omniauth.auth"]
  user = User.first_or_create({ :uid => auth["uid"]}, {
    :uid => auth["uid"],
    :nickname => auth["info"]["nickname"], 
    :name => auth["info"]["name"],
    :created_at => Time.now })
  session[:user_id] = user.id
  redirect '/'
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
  erb :index
end

# get '/people/' do
#   @users = User.all
#   halt 404 if @users.nil?
#   haml :people
# end


get '/:nickname/?' do
  if current_user
    @current_user = current_user
  end
  @user = User.first(:nickname => params[:nickname])
  puts '@user'
  halt 404 if @user.nil?
  erb :index
end

not_found do
  status 404
  erb :notfound
end

