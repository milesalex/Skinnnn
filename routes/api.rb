class Api < Sinatra::Base

  before '/api*' do
    content_type 'application/json'
    @current_user ||= User.get(session[:user_id]) if session[:user_id]
  end

  get '/api/users' do
    halt 403 unless @current_user && @current_user.id == 1
    users = User.all
    users.to_json
  end

  # USERS
  get '/api/users/:id' do
    user = User.get(params[:id])
    user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
  end

  get '/api/users/:nickname' do
    user = User.first(:nickname => params[:nickname]);
    user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
  end

  put '/api/users/:id' do
    halt 403 unless @current_user.id == params[:id]
    @current_user.update(JSON.parse(request.body.read))
  end

  # LINKS
  get '/api/users/:id/links' do
    halt 403 unless @current_user.id == params[:id]
    links = @current_user.links
    links.to_json
  end

  put '/api/users/:id/links/:link_id' do
    halt 403 unless @current_user.id == params[:id]
    link = @current_user.links.first(id: params[:link_id])
    link.update(JSON.parse(request.body.read))

    # fix the linked list style sorting of links
    next_link = @current_user.links.first(previous_link_id: updated_link.previous_link_id)
    next_link.update(previous_link_id: link.id)
  end

  post '/api/users/:id/links' do
    halt 403 unless @current_user.id == params[:id]
    @current_user.links.create(JSON.parse(request.body.read))
  end

  delete '/api/users/:id/links/:link_id' do
    halt 403 unless @current_user.id == params[:id]
    link = @current_user.links.first(:id => params[:link_id])
    link.destroy
  end

  get '/api/auth/logged_in' do
    if @current_user
      status 200
    else
      status 400
    end
  end

end
