import Ember from 'ember';

export default Ember.Component.extend({
  model: null,

  errors: Ember.computed('model.errors.[]', function() {
    const errors = this.get('model.errors');
    return errors.errorsFor('base');
  }),
  hasError: Ember.computed('model.errors.[]', function() {
    const errors = this.get('model.errors');
    return errors.has('base');
  })
});
