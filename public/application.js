// public/application.js

(function($){

	//alert('works');

	var User = Backbone.Model.extend({
		defaults: {
			name: null
		}
	});

	var UserView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button#edit' : 'editUser'
		},
		initialize: function(){
			_.bindAll(this, 'editUser', 'render');

			this.editMode = false;
			this.render();
		},
		render: function(){
			$(this.el).append('works');
			$(this.el).append('<button id="edit">Edit</button>');
		},
		editUser: function(){
			this.editMode = true;
		}
	});

	var userView = new UserView();

})(jQuery);
