$(function(){

  var UserModel = Backbone.Model.extend({
    urlRoot: '/api/users'
  });

  var Users = Backbone.Collection.extend({
    model: UserModel,
    url: '/api/users'
  });

  var EditView = Backbone.View.extend({
    el: $('body'),
    makeEditable: function(){
      var currentUser = $('body').data('current-user'); // Get current user id
      var currentProfile = $('.content').data('current-profile'); // the id of the users profile that is in view
      if ( currentUser === currentProfile ){
        $('.name').attr( 'contenteditable', 'true');
        $('.description').attr( 'contenteditable', 'true' );

      }
    },
    saveOnBlur: function(elm){
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
    },

    events: {
      'blur .name' : 'saveOnBlur',
      'blur .description' : 'saveOnBlur'
      // 'input .name' : 'sanitizeOnPaste',
      // 'input .description' : 'sanitizeOnPaste'
    },

    initialize: function(){
      _.bindAll(this, 'render');
      this.makeEditable();
      this.render();
    },

    render: function(){
      // $(this.el).prepend('works');
    }
  });

  var editView = new EditView();

});
