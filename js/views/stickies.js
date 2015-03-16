define([
  'jquery', 
  'underscore', 
  'backbone',
  'collections/stickies',
  'text!templates/stickies.html'
  ], function($, _, Backbone, stickies, stickiesTemplate){
  var stickyView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template(stickiesTemplate),

    // The DOM events specific to an item.
    events: {
      "click .deleteItem"              : "clear",
      "dblclick div.sticky-content" : "edit",
      "keypress .sticky-input"      : "updateOnEnter"
    },

    initialize: function() {
      _.bindAll(this, 'render', 'close','dragStop');
      this.model.bind('change', this.render);
      this.model.view = this;
    },

    dragStop: function(event){
      //Find Target Element
      var x = event.clientX;
      var y = event.clientY;
      var elementMouseIsOver = document.elementFromPoint(x, y);

      //Update model as approprate for each of the drop targets
      if(elementMouseIsOver.title ==='progress'){
        this.model.setInProgress();
      }else if(elementMouseIsOver.title ==='complete'){
        this.model.setCompleted();
      }else{
        this.model.setToDo();
      }
      //reload view after update
      window.location.reload()
    },

    // Render the contents of the sticky item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.el.draggable =true;
      this.el.ondragstart = this.dragStart;
      this.el.ondragend = this.dragStop;

      this.setContent();
      return this;
    },

    //Set content of the sticky
    setContent: function() {
      var content = this.model.get('content');
      this.$('.sticky-content').text(content);
      this.input = this.$('.sticky-input');
      this.input.bind('blur', this.close);
      this.input.val(content);
    },
    //Potential event for on drag start event
    dragStart: function (event) {

    },
    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.el.childNodes[1].childNodes[1].childNodes[1].style.display='none';
      var element =this.el.childNodes[1].childNodes[1].childNodes[3];
      element.style.display = 'block';
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });
  return stickyView;
});
