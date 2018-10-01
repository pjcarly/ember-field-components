import Component from '@ember/component';

export default Component.extend({
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
