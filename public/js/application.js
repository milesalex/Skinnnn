// public/application.js

(function($){


	var userModel = Backbone.Model.extend({});

	var userCollection = Backbone.Collection.extend({});

	var userView = Backbone.View.extend({});





	// Sign In View

	var SignInView = Backbone.View.extend({
		el: $('.sign-in'),
		events: {
			'click #sign_in' : 'signIn',
			'click #sign_up' : 'signUp'
		},
		initialize: function(){
			_.bindAll(this, 'signIn', 'signUp', 'signOut', 'render');
			this.render();
		},
		render: function(){
			// Compile the template using underscore
            var template = _.template( $("#signin_template").html(), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( template );
		},
		signIn: function(){
			// $.ajax({
			// 	url: "/signin",
			// 	//serialize the form and use it as data for our ajax request
			// 	data: $(this).serialize(),
			// 	//the type of data we are expecting back from server, could be json too
			// 	dataType: "html",
			// 	success: function(data) {
			// 		//if our ajax request is successful, replace the content of our viz div with the response data
			// 		$('#viz').html(data);
			// 	}
			// });
			alert('fuck');
		},
		signUp: function(){

		},
		signOut: function(){

		}
	});

	var signInView = new SignInView();




})(jQuery);
