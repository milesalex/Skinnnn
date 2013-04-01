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
    initialize: function(){
      _.bindAll(this, 'render');
    },
    render: function(){
      $(this.el).html('<a class="editable" target="_blank" href="' + this.model.get('url') + '">' + this.model.get('name') +' </a>');
      return this;
    }
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

      var user_id = $('body').data('current-user');
      this.user = new UserModel({id: user_id});

      // this.collection = new LinkCollection();
      this.collection = this.user.links;

      this.collection.fetch({
        reset: true,
        success: function(data){
          console.log(data);
        }
      });

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
      var linkView = new LinkView({
        model: link
      });

      $('.links', this.el).append(linkView.render().el);
    },

    focused: function(elm){
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
