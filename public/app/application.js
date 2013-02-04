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
    events: {
      'click a.edit-btn' : 'editProfile'
    },
		initialize: function(){
			_.bindAll(this, 'render');

      this.isEditing = false;
		},
		render: function(user_data){
			// Compile the template using underscore
      var template = _.template( $("#user_template").html(), user_data );
      // Load the compiled HTML into the Backbone "el"
      this.$el.hide();
      this.$el.html(template);
      this.$el.fadeIn(300);
      return this;
		},
    editProfile: function(){
      this.isEditing = true;
      $('.edit-btn').text('Editing...');
      if (this.isEditing === true){
        // Render edit view
        var user_id = $('body').data('id');
        var editView = new EditView({id: user_id});
        editView.fetch({
          success: function(model){
            console.log(model.attributes);
            
          }
        });
        editView.render();

        var user_id = $('body').data('id');
        var user = new UserModel({id: user_id});
        user.fetch({
          success: function(model){
            console.log(model.attributes);
            var userView = new UserView();
            userView.render(model.attributes);
          }
        });
      } else {
        // Unrender edit view
      }
    }
	});



  var EditView = Backbone.View.extend({
    el: $('.edit-profile'),
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      var template = _.template($('#edit_template').html());
      this.$el.html(template);
      this.$el.fadeIn(300);
      return this;
    },
    editProfile: function(user_id){

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
