$(function(){

  var UserModel = Backbone.Model.extend({
    urlRoot: '/api/users',
    initialize: function(){
      this.links = new LinkModel();
      this.links.url = '/api/users/' + this.id + '/links';
    }
  });

  var LinkModel = Backbone.Model.extend({});

  var LinkCollection = Backbone.Collection.extend({
    model: LinkModel
  });

  var EditView = Backbone.View.extend({
    el: $('body'),

    events: {
      'blur h1.name' : 'saveOnBlur',
      'blur p.description' : 'saveOnBlur',
      'focus .editable' : 'focused',
      'click button.add' : 'addLink'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'makeEditable', 'addLink', 'appendLink');

      this.collection = new LinkCollection();
      // this.collection.fetch({
      //   success: function(data){
      //     console.log(data);
      //   }
      // });

      this.collection.bind('add', this.appendLink);

      this.render();
    },

    render: function(){
      var self = this;
      this.makeEditable();
      _(this.collection.models).each(function(link){
        self.appendLink(link);
      }, this);

    },

    makeEditable: function(){
      var currentUser = $('body').data('current-user'); // Get current user id
      var currentProfile = $('.content').data('current-profile'); // the id of the users profile that is in view
      if ( currentUser === currentProfile ){
        $('h1.name').attr( 'contenteditable', 'true');
        $('p.description').attr( 'contenteditable', 'true' );
      }
    },

    saveOnBlur: function(elm){
      $('.editable').removeClass('faded');
      $('.editable').removeClass('active');
      var user_id = $('body').data('current-user');
      var attr = $(elm.currentTarget).data('attr');
      var value = $(elm.currentTarget).text();
      var user = new UserModel({id: user_id});
      var arr = {};
      if (attr == 'name') {
        arr = { name: value };
      } else if (attr == 'bio') {
        arr = { bio: value };
      }
      user.save( arr, {
        success: function (user) {
          alert(user.toJSON());
        }
      });
    },

    addLink: function(){

      var linkName = $('.new-link-form .name').val();
      var linkURL = $('.new-link-form .url').val();
      var link = new LinkModel();

      link.set({
        name: linkName,
        url: linkURL
      });

      this.collection.add(link);

      console.log(this.collection);

      // var user_id = $('body').data('current-user');
      // var user = new UserModel({id: user_id});

      // var arr = {
      //   name: name,
      //   url: url
      // };
      // user.links.save( arr, {
      //   success: function (links) {
      //     console.log(links.toJSON());
      //   }
      // });
    },

    appendLink: function(link){
      $('.links', this.el).append("<li><a class='editable' target='blank' data-id=" + link.get('id') + " href=" + link.get('url') + ">" + link.get('name') + "</a></li>");
    },

    focused: function(elm){
      console.log('fade');
      $(elm.currentTarget).addClass('active');
      $('.editable').addClass('faded');
    },

    sanitizeOnPaste: function(elm){
      /* Sanitize text after user pastes rich html
         ----
         Catch any input event and pipe the text through
         a hidden text area. This strips all formatting.
         After formatting is stripped, place the text
         into the original div. */

      $('.hidden').val(elm.currentTarget.innerText);
      console.log(elm);
      var strip = $('.hidden').val();
      $('.description').text(strip);
    }

  });

  var editView = new EditView();

});
