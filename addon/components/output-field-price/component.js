import Ember from 'ember';
import OutputFieldNumber from '../../components/output-field-number/component';

const { computed, isBlank, inject } = Ember;
const { service } = inject;

export default OutputFieldNumber.extend({
  fieldSettings: service(),
  currency: computed('model.currency', 'fieldSettings.defaultCurrency', function(){
    const modelCurrency = this.get('model.currency');
    const availableCurrencies = this.get('fieldSettings.availableCurrencies');

    if(isBlank(modelCurrency) || !availableCurrencies.includes(modelCurrency)) {
      return this.get('fieldSettings.defaultCurrency');
    } else {
      return modelCurrency;
    }
  })
});
