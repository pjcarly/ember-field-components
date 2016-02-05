import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  tagName: 'tr',
  classNameBindings: ['selected'],

  model: null,
  link: false,
  selected: false,

  modelType: Ember.computed('model', function() {
    return this.get('model').constructor;
  }),

  columns: Ember.computed('modelType', function() {
    return this.get('modelType').settings.listViews.default.columns;
  }),

  actions: {
    click: function() {
      this.sendAction('action', this.get('model'));
    },
    toggleSelect: function(newValue) {
      this.set('selected', !this.get('selected'));
    }
  }
});