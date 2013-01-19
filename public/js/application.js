// public/application.js

(function($){


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

	// // List Users
	// var ListUsers = Backbone.View.extend({
	// 	el: $('#people'),
	// 	template: _.template($('#people_template').html()),
	// 	initialize: function(){
	// 		_.bindAll(this);
	// 		this.collection = new UserCollection();
	// 		this.collection.bind('all', this.render, this);
	// 		this.collection.fetch();
	// 	},
	// 	render: function(){
	// 		console.log(this.collection);
	// 		var html = this.template({collection: this.collection});
	// 		this.$el.html(html);
	// 		return this;
	// 	}

	// });

	//var users = new UserCollection();
	//var listUsers = new ListUsers();




	// // User View
	// var UserView = Backbone.View.extend({
	// 	el: $('#content'),
	// 	template: _.template($('#user_template').html()),
	// 	initialize: function(user_id){
	// 		_.bindAll(this, 'render');
	// 	},
	// 	render: function(){
	// 		//var html = this.template()
	// 	}
	// });



	// App Router
	var AppRouter = Backbone.Router.extend({
		routes: {
			"" : "index",
			":nickname" : "getUser"
		},
		index: function(){
			console.log("You've reached the homepage");
		},
		getUser: function(nickname){
			console.log(nickname);
			var user_id = $('body').data('id');
			var user = new UserModel({id: user_id});
			user.fetch({
				success: function(model){
					console.log(model.attributes);
				}
			});
		}
	});

	var appRouter = new AppRouter();

	Backbone.history.start({ pushState: true });



})(jQuery);
