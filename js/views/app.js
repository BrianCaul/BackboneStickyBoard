define([
  'jquery',
  'underscore', 
  'backbone',
  'collections/stickies',
  'views/stickies'
  ], function($, _, Backbone, stickies, stickyView){
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#scrumboardapp"),

    // Delegate event for creating new sticky
    events: {
      "click #addsticky":  "createOnEnter",

    },

    // At initialization we bind to the relevant events on the `Stickies`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting Stickies that might be saved in *localStorage*.
    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll');
      stickies.bind('add',     this.addOne);
      stickies.bind('reset',   this.addAll);
      stickies.fetch();
    },
    // Add a single Sticky to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(sticky) {
      var view = new stickyView({model: sticky});
      if(sticky.attributes.status==='inprogress'){
        this.$("#progress-list").append(view.render().el);
      }
      else if(sticky.attributes.status==='complete'){
        this.$("#complete-list").append(view.render().el);
      }
      else{
        this.$("#todo-list").append(view.render().el);
      }
    },
    
    // Add all items in the **Stickies** collection at once.
    addAll: function() {
      stickies.each(this.addOne);
    },

    // Generate the attributes for a new Sticky.
    newAttributes: function() {
      return {
        content: 'New Todo Task..',
        order:   stickies.nextOrder(),
        status:    'todo'
      };
    },

    // If you hit the add button, create new **Sticky** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      stickies.create(this.newAttributes());
    }

  });
  return AppView;
});
