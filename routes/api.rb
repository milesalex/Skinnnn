class Api < Sinatra::Base

  before '/api*' do
    content_type 'application/json'
    @current_user ||= User.get(session[:user_id]) if session[:user_id]
  end

  # get '/api/users' do
  #   users = User.all
  #   users.to_json
  # end

  get '/api/users/:id' do
    user = User.get(params[:id])
    user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
  end

  get '/api/users/:nickname' do
    user = User.first(:nickname => params[:nickname]);
    user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
  end

  put '/api/users/:id' do
    raise 403 unless @current_user.id == session[:user_id]
    @current_user.update(JSON.parse(request.body.read))
  end

  get '/api/auth/logged_in' do
    if @current_user
      status 200
    else
      status 400
    end
  end

  put '/api/users/:id/link/:link_id' do
    user = User.get(params[:id])
  end

  post '/api/users/:id/links' do
    puts '----- works ------'
    ## puts params[:id]
    user = User.get(params[:id])
    user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
    link = user.profile.links.create(:name => 'Travel Blog', :url => 'travel.alexmilesdesign.com')
  end

end
