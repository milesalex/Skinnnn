// public/application.js
(function($) {

	_.templateSettings = {
		interpolate: /\[\%\=(.+?)\%\]/g,
		evaluate: /\[\%(.+?)\%\]/g
	};

	LinkModel = Backbone.Model.extend({
		defaults: {
			name: '',
			url: ''
		}
	});

	var LinkCollection = Backbone.Collection.extend({
		model: LinkModel,
		save: function(user_id, data) {
			this.urlRoot = '/api/users' + user_id + '/links';
			Backbone.Model.prototype.save.apply(this, data);
		}
	});

	ProfileModel = Backbone.Model.extend({
		initialize: function(opts) {
			var links_data = opts ? opts.links: null;
			this.links = new LinkCollection(links_data);
		},
		save: function(user_id, opts) {
			//this.urlRoot = '/api/user/' + user_id + '/profile';
			//Backbone.Model.prototype.save.apply(this, opts);
			this.links.save(this.user_id);
		}
	});

	UserModel = Backbone.Model.extend({
		urlRoot: '/api/user',
		initialize: function(opts) {
			var profile_data = opts ? opts.profile: null;
			this.profile = new ProfileModel(profile_data);
		},
		save: function(opts) {
			Backbone.Model.prototype.save.apply(this, opts);
			if (this.profile) {
				this.profile.save(this.get('id'));
			}
		}
	});

	var UserCollection = Backbone.Collection.extend({
		model: UserModel,
		url: '/api/users'
	});

	// List Users
	var UserListView = Backbone.View.extend({
		el: $('.main'),
		template: _.template($('#users_template').html()),
		render: function() {
			var users = new UserCollection();
			users.fetch({
				success: _.bind(function(users) {
					var rendered = this.template({
						users: users.models
					});
					this.$el.hide();
					this.$el.html(rendered);
					this.$el.fadeIn(300);
				},
				this)
			});
			return this;
		}
	});

	var userListView = new UserListView();

	// // User View
	var UserView = Backbone.View.extend({
		el: $('#profile'),
		edit_template: _.template($('#user_edit').html()),
		view_template: _.template($('#user_view').html()),
		link_template: _.template($('#link_view').html()),
		events: {
			'click a.edit-btn': 'editProfile',
			'click a.save-btn': 'saveProfile',
			'click a.add-btn': 'addLink'
		},
		initialize: function() {
			_.bindAll(this, 'render');
			this.current_user = null;
			this.edit_mode = false;
		},
		render: function() {
			this.$el.hide();
			if (!this.current_user) {
				return this;
			}

			var context = {
				user: this.current_user
			};
			if (this.edit_mode) {
				this.$el.html(this.edit_template(context));
			} else {
				this.$el.html(this.view_template(context));
			}

			this.$el.fadeIn(300);
			return this;
		},
		editProfile: function() {
			this.edit_mode = true;
			this.render();
		},
		saveProfile: function() {
			console.log("saveProfielo");
			this.current_user.save({
				success: _.bind(function(model) {
					this.edit_mode = false;
					this.render();
				},
				this)
			});
		},
		addLink: function(args) {
			console.log("addLink");
			if (!this.edit_mode) {
				return this;
			}
			var name_field = $("#add_link :input[name='name']");
			var name = name_field.val();
			if (!name) {
				name_field.addClass("missing");
				return this;
			} else {
				name_field.removeClass("missing");
			}

			var url_field = $("#add_link :input[name='url']");
			var url = url_field.val();
			if (!url) {
				url_field.addClass("missing");
				return this;
			} else {
				url_field.removeClass("missing");
			}

			name_field.val('');
			url_field.val('');

			var new_link = {
				url: url,
				name: name
			};
			var rendered = this.link_template(new_link);
			$('#link_list').append(rendered);
			this.current_user.attributes.profile.links.push(new_link);

			return this;
		}
	});

	var userView = document.userView = new UserView();

	// App Router
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			":nickname": "getUser"
		},
		index: function() {
			console.log("You've reached the homepage");
			userListView.render();
		},
		getUser: function(nickname) {
			console.log(nickname);
			var user_id = $('body').data('id');
			var user = new UserModel({
				id: user_id
			});
			user.fetch({
				success: function(model) {
					console.log(model.attributes);
					userView.current_user = model;
					userView.render();
				}
			});
		}
	});

	var appRouter = new AppRouter();

	Backbone.history.start({
		pushState: true
	});

})(jQuery);

