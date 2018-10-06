import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  errors: computed('model.errors.[]', 'displayAll', function() {
    const errors = this.get('model.errors');
    return this.get('displayAll') ? errors : errors.errorsFor('base');
  })
});
