(function($){

  var EditView = Backbone.View.extend({
    el: $('body'),

    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },

    render: function(){
      $(this.el).prepend('works');
    }
  });

  var editView = new EditView();

})(jQuery);