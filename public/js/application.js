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
		urlRoot: '/user',
		defaults: {
			name: '',
			email: ''
		}
	});




})(jQuery);
