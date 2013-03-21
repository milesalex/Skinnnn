$(function(){

  var User = Backbone.Model.extend({});

  var Users = Backbone.Collection.extend({
    model: User,
    url: '/api/users'
  });

  var EditView = Backbone.View.extend({
    el: $('body'),

    makeEditable: function(){
      // Test if user is logged in
      // There should be a safer way to do this
      if ( $(this.el).hasClass('logged-in') ){
        // Add contenteditable attr to elements
        $('h1.name').attr( 'contenteditable', 'true' );
        $('p.description').attr( 'contenteditable', 'true' );
        // Enable saveOnBlur
        this.saveOnBlur();
      } else {
        // User is logged out
        console.log('NOT logged in');
      }
    },

    saveOnBlur: function(){
      $('p.description').blur(function(){
        alert('save now');
      });
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
