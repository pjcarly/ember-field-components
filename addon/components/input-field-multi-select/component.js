import Component from '@ember/component';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Component.extend(FieldInputComponent, {
  selectOptions: computed('fieldOptions', 'value', function() {
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.selectOptions;
  }),
  none: computed(function(){
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.none;
  }),
  actions: {
    valueChanged(value) {
      if (!isBlank(value)) {
        this.set('value', value);
        this.sendAction('valueChanged', value);
      } else {
        this.set('value', null);
        this.sendAction('valueChanged', null);
      }
    }
  }
});
