import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  object: null,
  columns: [],

  actions: {
    click: function() {
      this.sendAction('action', this.get('object'));
    }
  }
});