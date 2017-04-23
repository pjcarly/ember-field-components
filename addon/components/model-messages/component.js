import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  model: null,

  errors: computed('model.errors.[]', function() {
    const errors = this.get('model.errors');
    return errors.errorsFor('base');
  }),
  hasError: computed('model.errors.[]', function() {
    const errors = this.get('model.errors');
    return errors.has('base');
  })
});
