import Component from '@ember/component';
import FieldOutputComponent from '../../mixins/component-field-output-super';
import { computed } from '@ember/object';

export default Component.extend(FieldOutputComponent, {
  selectOptions: computed(function() {
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.selectOptions;
  }),
  none: computed(function(){
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.none;
  })
});
