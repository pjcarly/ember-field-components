import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  errors: Ember.computed('model.errors.[]', function() {
    var errors = this.get('model.errors');
    return errors.errorsFor(this.get('field'));
  }),
  hasError: Ember.computed('model.errors.[]', function() {
    var errors = this.get('model.errors');

    return errors.has(this.get('field'));
  })
});
