// public/application.js

(function($){


	// User Model - GET User.find(:id)
	window.UserModel = Backbone.Model.extend({
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




	// ------------------------------------------------



	// App Router
	var AppRouter = Backbone.Router.extend({
		routes: {
			"" : "index",
			":nickname" : "getUser"
		},
		showAbout: function(e){
			e.preventDefault();
			console.log('about');
			this.navigate("about", true);
		}
	});

	var appRouter = new AppRouter();

	appRouter.on('route:index', function(x){
		console.log("You've reached the homepage");
	});

	appRouter.on('route:getUser', function(nickname){
		console.log(nickname);
		var user_id = $('.container').data('id');
		var user = new UserModel({id: user_id});
		user.fetch({
			success: function(model){
				console.log(model.attributes);
			}
		});
	});

	appRouter.on('route:defaultRoute', function(actions){
		//alert(actions);
	});


	Backbone.history.start({ pushState: true });



})(jQuery);
