// public/application.js

(function($){


	_.templateSettings = {
    interpolate: /\[\%\=(.+?)\%\]/g,
    evaluate: /\[\%(.+?)\%\]/g
	};


	// User Model - GET User.find(:id)
	UserModel = Backbone.Model.extend({
		urlRoot: '/api/user',
		defaults: {}
	});


	// User Collection - GET User.all
	var UserCollection = Backbone.Collection.extend({
		model: UserModel,
		url: '/api/users'
	});


	// List Users
	var UserListView = Backbone.View.extend({
    el: '.main',
    render: function () {
      var that = this;
      var users = new UserCollection();
      users.fetch({
        success: function (users) {
          var template = _.template($('#users_template').html(), {users: users.models});
          that.$el.hide();
          that.$el.html(template);
          that.$el.fadeIn(300);
        }
      });
    }
  });

  var userListView = new UserListView();


	// // User View
	var UserView = Backbone.View.extend({
		el: $('.main'),
		template: _.template($('#user_template').html()),
		initialize: function(user_id){
			_.bindAll(this, 'render');
		},
		render: function(user_data){
			// Compile the template using underscore
      var template = _.template( $("#user_template").html(), user_data );
      // Load the compiled HTML into the Backbone "el"
      this.$el.hide();
      this.$el.html(template);
      this.$el.fadeIn(300);
      return this;
		}
	});


	// App Router
	var AppRouter = Backbone.Router.extend({
		routes: {
			"" : "index",
			":nickname" : "getUser"
		},
		index: function(){
			console.log("You've reached the homepage");
			userListView.render();
		},
		getUser: function(nickname){
			console.log(nickname);
			var user_id = $('body').data('id');
			var user = new UserModel({id: user_id});
			user.fetch({
				success: function(model){
					console.log(model.attributes);
					var userView = new UserView();
					userView.render(model.attributes);
				}
			});

		}
	});

	var appRouter = new AppRouter();

	Backbone.history.start({ pushState: true });



})(jQuery);
