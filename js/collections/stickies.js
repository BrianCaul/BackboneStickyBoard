define([
  'underscore', 
  'backbone', 
  'libs/backbone/localstorage', 
  'models/sticky'
  ], function(_, Backbone, Store, sticky){
	  
	var stickiesCollection = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: sticky,

    // Save all of the sticky items under the `"stickies"` namespace.
    localStorage: new Store("stickies"),
    // We keep the stickies in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    // Stickies are sorted by their original insertion order.
    comparator: function(sticky) {
      return sticky.get('order');
    }

  });
  return new stickiesCollection;
});
