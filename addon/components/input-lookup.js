import Ember from 'ember';

export default Ember.Component.extend({
  selectOptions: [{
    'value': 'nl',
    'label': 'Dutch'
  }, {
    'value': 'fr',
    'label': 'French'
  }, {
    'value': 'en',
    'label': 'English'
  }],

  columns: ['value', 'label'],

  hasValue: Ember.computed('value', function() {
    return !Ember.isNone(this.get('value'));
  }),

  actions: {
    showModal: function() {
      this.$('.modal').modal('show');
    },
    modelSelected: function(selectedModel) {
      this.$('.modal').modal('hide');
      this.set('value', selectedModel);
      this.sendAction('valueChanged', selectedModel);
    },
    clearLookup: function() {
      this.set('value', null);
      this.sendAction('valueChanged', null);
    }
  }
});