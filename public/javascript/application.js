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
        console.log('same user');
        // // Add contenteditable attr to elements
        $('h1.name').attr( 'contenteditable', 'true' );
        $('p.description').attr( 'contenteditable', 'true' );
      } else {
        // User is logged out
        console.log('different user');
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
      
      console.log(arr);

      user.save( arr, {
        success: function (user) {
          alert(user.toJSON());
        }
      });
      // user.fetch({
      //   success: function (user) {
      //     console.log(user.toJSON());
      //   }
      // });
    },
    events: {
      'blur .name' : 'saveOnBlur',
      'blur .description' : 'saveOnBlur'
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
