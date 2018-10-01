import Component from '@ember/component';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Component.extend(FieldInputComponent, {
  hasDecimals: computed('fieldAttributeOptions', function(){
    let fieldAttributeOptions = this.get('fieldAttributeOptions');

    return (!isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('decimals') && fieldAttributeOptions.decimals > 0);
  })
});
