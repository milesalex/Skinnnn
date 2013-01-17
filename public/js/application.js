// public/application.js

(function($){


	// User Model - GET User.find(:id)
	var UserModel = Backbone.Model.extend({
		urlRoot: '/api/user',
		defaults: {}
	});

	// User Collection - GET User.all
	var UserCollection = Backbone.Collection.extend({
		model: UserModel,
		url: '/api/users'
	});

	// List Users
	var ListUsers = Backbone.View.extend({
		el: $('#people'),
		template: _.template($('#people_template').html()),
		initialize: function(){
			_.bindAll(this);
			this.collection = new UserCollection();
			this.collection.bind('all', this.render, this);
			this.collection.fetch();
		},
		render: function(){
			console.log(this.collection);
			var html = this.template({collection: this.collection});
			this.$el.html(html);
			return this;
		}

	});

	//var users = new UserCollection();
	var listUsers = new ListUsers();


	// ------------------------------------------------


	// Search View
	var SearchView = Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function(){
			// Compile the template using underscore
			var template = _.template( $("#search_template").html(), {});
			// Load the compiled HTML into the Backbone "el"
			this.$el.html( template );
		},
		events: {
			"click input[type=button]" : "doSearch"
		},
		doSearch: function(e){
			//alert("Search for " + $('#search_input').val());
		}
	});

	var search_view = new SearchView({ el: $("#search_container") });




	// ------------------------------------------------



	// App Router
	var AppRouter = Backbone.Router.extend({
		routes: {
			"/about/" : "showAbout",
			"*actions" : "defaultRoute",
			"/:nickname" : "getUser",
			"/sign_in/" : "signIn",
			"/sign_out/" : "signOut"
		},
		showAbout: function(e){
			e.preventDefault();
			console.log('about');
			this.navigate("about", true);
		}
	});

	var appRouter = new AppRouter();

	appRouter.on('route:defaultRoute', function(actions){
		
	});

	appRouter.on('route:getUser', function(nickname){
		//alert('viewing ' + nickname);
	});

	Backbone.history.start();



})(jQuery);
