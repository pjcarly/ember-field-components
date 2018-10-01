import InputFieldNumber from '../../components/input-field-number/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default InputFieldNumber.extend({
  fieldSettings: service(),
  currency: computed('model.currency', 'fieldSettings.defaultCurrency', function(){
    const modelCurrency = this.get('model.currency');
    const availableCurrencies = this.get('fieldSettings.availableCurrencies');

    if(isBlank(modelCurrency) || !availableCurrencies.includes(modelCurrency)) {
      return this.get('fieldSettings.defaultCurrency');
    } else {
      return modelCurrency;
    }
  }),
});
