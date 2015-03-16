define(['underscore', 'backbone'], function(_, Backbone) {
  var stickyModel = Backbone.Model.extend({

    // Default attributes for the sticky.
    defaults: {
      content: "New Sticky...",
      status: 'todo'
    },

    // Ensure that each sticky created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Change the status of this sticky item.
    setInProgress: function() {
      this.save({status: 'inprogress'});
    },
    // Change the status of this sticky item.
    setCompleted: function() {
      this.save({status: 'complete'});
    },

        // Change the status of this sticky item.
    setToDo: function() {
      this.save({status: 'todo'});
    },

    // Remove this sticky from *localStorage* and delete its view.
    clear: function() {
      this.destroy();
      this.view.remove();
    }

  });
  return stickyModel;
});
