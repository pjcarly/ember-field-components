import Ember from 'ember';
import OutputText from '../output-text/component';

const { isEmpty, computed, isBlank, assert } = Ember;

export default OutputText.extend({
  type: 'select',
  value: null,
  selectOptions: [],

  selectedvalue: computed('value', 'selectOptions', function() {
    let value = this.get('value');
    if (!isBlank(value)) {
      let selectOptions = this.get('selectOptions');
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
