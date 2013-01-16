// public/application.js

(function($){


	// Link Model
	var LinkModel = Backbone.Model.extend({
		defaults: {
			title: null,
			url: null,
			order: 0
		},
		initialize: function(){
			//alert("You created a link");
			this.on("change:title", function(model){
				var title = model.get("title");
				//alert("Changed the title to " + title);
			});
		}
	});

	var link = new LinkModel({ title: "Dribbble" });
	link.set({title: 'Twitter'});

	

	// ----------------------------------------------



	// User Model
	var UserModel = Backbone.Model.extend({
		urlRoot: '/api/user',
		defaults: {}
	});

	var user = new UserModel({id: 8});

	user.fetch({
		success: function (user){
			console.log(user.toJSON());
		}
	});

	// user.save({email: 'howdy@alexmilesdesign.com'}, {
	// success: function (model) {
	// console.log(user.toJSON());
	// }
	// });


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
			alert("Search for " + $('#search_input').val());
		}
	});

	var search_view = new SearchView({ el: $("#search_container") });



	// ------------------------------------------------



	// App Router
	var AppRouter = Backbone.Router.extend({
		routes: {
			"*actions" : "defaultRoute"
		}
	});

	var appRouter = new AppRouter();

	appRouter.on('route:defaultRoute', function(actions){
		alert('action ' + actions);
	});

	Backbone.history.start();



})(jQuery);
