import OutputFieldNumber from '../../components/output-field-number/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default OutputFieldNumber.extend({
  fieldInformation: service(),
  currency: computed('model.currency', 'fieldInformation.defaultCurrency', function(){
    const modelCurrency = this.get('model.currency');
    const availableCurrencies = this.get('fieldInformation.availableCurrencies');

    if(isBlank(modelCurrency) || !availableCurrencies.includes(modelCurrency)) {
      return this.get('fieldInformation.defaultCurrency');
    } else {
      return modelCurrency;
    }
  })
});
