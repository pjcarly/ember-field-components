import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['object-list'],

  actions: {
    objectSelected: function(object) {
      this.sendAction('objectSelected', object);
    },
    new: function() {
      this.sendAction('newModel');
    }
  }
});
