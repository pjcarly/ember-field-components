import OutputText from '../output-text/component';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { assert } from '@ember/debug';

export default OutputText.extend({
  type: 'select',
  attributeBindings: ['selectedvalue:data-select-option'],
  selectedvalue: computed('value', 'selectOptions', function() {
    let value = this.get('value');
    if (!isBlank(value)) {
      let selectOptions = isBlank(this.get('selectOptions')) ? [] : this.get('selectOptions');
      assert('No selectOptions passed', !isEmpty(selectOptions));

      let selectedoption = selectOptions.findBy('value', value);

      if (!isBlank(selectedoption)) {
        if (selectedoption.hasOwnProperty('label')) {
          return selectedoption.label;
        } else {
          return selectedoption.value;
        }
      } else {
        return value;
      }
    }
  })
});
