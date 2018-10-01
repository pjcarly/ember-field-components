import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',
  errors: computed('model.errors.[]', function() {
    var errors = this.get('model.errors');
    return errors.errorsFor(this.get('field'));
  }),
  hasError: computed('model.errors.[]', function() {
    var errors = this.get('model.errors');

    return errors.has(this.get('field'));
  })
});
