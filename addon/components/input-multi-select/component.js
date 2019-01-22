import InputSelect from 'ember-field-components/components/input-select/component';
import InputComponent from '../../mixins/component-input';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default InputSelect.extend(InputComponent, {
  computedValue: computed('value', function(){
    let value = this.get('value');
    if(!isBlank(value)){
      return this.get('value');
    }

    return [];
  })
});
