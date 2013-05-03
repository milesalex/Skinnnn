$(function(){

  var UserModel = Backbone.Model.extend({
    urlRoot: '/api/users',
    initialize: function(){
      this.links = new LinkCollection();
      this.links.url = '/api/users/' + this.id + '/links';
      // this.links.on("reset", this.updateCounts);
    }
  });

  var LinkModel = Backbone.Model.extend({});

  var LinkCollection = Backbone.Collection.extend({
    model: LinkModel
  });

  var LinkView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'click a.delete' : 'destroy',
      'click a.edit' : 'edit',
      'click a.save' : 'save'
    },

    initialize: function(){
      _.bindAll(this, 'render');
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function(){
      $(this.el).html(
        '<a class="editable" target="_blank" href="' + this.model.get('url') + '">' + this.model.get('name') +' </a>' +
        '<span class="actions"><a class="edit">edit</a><a class="save">save</a><a class="delete">delete</a></span>'
      );
      return this;
    },

    destroy: function(){
      this.model.destroy({
        success: function(data){
          console.log(data);
        }
      });
    },

    edit: function(){

    },

    save: function(){

    }
  });

  var EditView = Backbone.View.extend({
    el: $('body'),

    events: {
      'click button.add' : 'addLink',
      'click button.edit-bio' : 'editBio'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'addLink', 'appendLink', 'getUserLinks');
      // Is user logged in?
      if (this.isUserLoggedIn() === true) {
        if (this.isUserOnCorrectProfile() === true) {
          console.log('Logged in: YES | On correct profile: YES');
          this.render();
        } else {
          console.log('Logged in: YES | On correct profile: NO');
        }
      } else {
        console.log('Logged in: NO | On correct profile: NO');
        console.log('kill js');
      }
    },

    render: function(){
      var self = this;
      var user_id = $('body').data('current-user');
      this.user = new UserModel({id: user_id});
      this.collection = this.user.links;
      this.collection.bind('add', this.appendLink);
      this.collection.fetch();
      _(this.collection.models).each(function(link){
        self.appendLink(link);
      }, this);
      this.makeEditable();
    },

    isUserLoggedIn: function(){
      var currentUser = $('body').data('current-user'); // Get current user id
      if ( currentUser !== null ){
        return true;
      } else {
        return false;
      }
    },

    isUserOnCorrectProfile: function(){
      var currentUser = $('body').data('current-user'); // Get current user id
      var currentProfile = $('.content').data('current-profile'); // the id of the users profile that is in view
      if (currentUser === currentProfile){
        return true;
      } else {
        return false;
      }
    },

    makeEditable: function(){
      var currentUser = $('body').data('current-user'); // Get current user id
      $('button.edit-bio').show();
      $('ul.links').empty();
      $("div.cover").dropzone({ url: "/api/users/" + currentUser + "/cover" });
    },

    editMode: false,

    editBio: function(elm){
      var button = elm.currentTarget;
      var input = $(button).prev();
      var element = $(button).prev().prev();
      var attr = $(button).data('attr');

      var user_id = $('body').data('current-user');
      var user = new UserModel({id: user_id});

      if (this.editMode === false) {
        var oldName = $(element).text();
        $(element).hide();
        $(button).text('Save');
        $(input).val(oldName).show();
        this.editMode = true;
        console.log('edit mode == true');
      } else {
        var newValue = $(input).val();
        $(input).hide();
        $(element).text(newValue).show();
        $(button).text('Edit');

        var obj = {};
        obj[attr] = newValue;
        user.save( obj, {
          success: function (user) {
            alert(user.toJSON());
          }
        });
        this.editMode = false;
        console.log('edit mode == false');
      }
    },

    getUserLinks: function(){
       // get user
    },

    addLink: function(){
      var linkName = $('.new-link-form .name').val();
      var linkURL = $('.new-link-form .url').val();
      var link = new LinkModel();
      this.collection.create({
        name: linkName,
        url: linkURL
      });
    },

    appendLink: function(link){
      var linkView = new LinkView({
        model: link
      });
      $('.links', this.el).append(linkView.render().el);
    }

  });

  var editView = new EditView();

});
