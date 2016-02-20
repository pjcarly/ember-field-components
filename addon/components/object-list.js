import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['object-list'],
  noresults: 'No Results',

  actions: {
    objectSelected: function(object) {
      this.sendAction('objectSelected', object);
    },
    new: function() {
      this.sendAction('newModel');
    }
  }
});
