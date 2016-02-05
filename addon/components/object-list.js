import Ember from 'ember';

export default Ember.Component.extend({
  objects: [],
  columns: [],

  actions: {
    objectSelected: function(model) {
      this.sendAction('modelSelected', model);
    },
    new: function() {
      this.sendAction('newModel');
    }
  }
});