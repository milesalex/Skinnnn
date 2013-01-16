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
		defaults: {
			uid: null,
			name: null,
			nickname: null,
			email: null
		}
	});

	var user = new UserModel({id: 5});

	user.fetch({
		success: function (user){
			console.log(user.toJSON());
		}
	});

	





})(jQuery);
