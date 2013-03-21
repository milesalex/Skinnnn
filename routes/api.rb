class Api < Sinatra::Base

  before '/api*' do
    content_type 'application/json'
  end

  get '/api/users' do
    users = User.all
    users.to_json
  end

  get '/api/users/:id' do
    user = User.get(params[:id])
    user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
  end

  get '/api/users/:nickname' do
    # curently in use
    user = User.first(:nickname => params[:nickname]);
    user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
  end

  put '/api/users/:id' do
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

  ## save link
  ##{}"/api/user/" + profile_id + "/link/" + link_id
  put '/api/users/:id/link/:link_id' do
    user = User.get(params[:id])
  end

  ## create link
  ## url = "/api/user/" + profile_id + "/links";
  ## type = "POST";
  post '/api/users/:id/links' do
    puts '----- works ------'
    ## puts params[:id]
    user = User.get(params[:id])
    user.to_json(:relationships=>{:profile=>{:methods=>[:links]}})
    link = user.profile.links.create(:name => 'Travel Blog', :url => 'travel.alexmilesdesign.com')

  end

  ## update user???
  ## var url = "/api/user/" + uid;
  ## type: 'PUT'
  put '/api/users/:id' do
    puts '------ PUT user ------'
  end


  ## Delete account
  ## var url = "/api/user/" + uid + '/' + e.data.link.id;
  ## type: 'DELETE'
end
