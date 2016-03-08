import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['object-list-row'],

  object: null,
  columns: [],

  actions: {
    click: function() {
      this.sendAction('objectSelected', this.get('object'));
    }
  }
});
