import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

const { Component, inject, computed, isBlank } = Ember;
const { service } = inject;

export default Component.extend(OutputComponent, {
  fieldSettings: service(),
  type: 'number',
  numberOptions: computed('fieldSettings.currencyDisplay', 'fieldSettings.defaultCurrency', 'currency', 'precision', function(){
    const currency = isBlank(this.get('currency')) ? this.get('fieldSettings.defaultCurrency') : this.get('currency');

    let options = {
      style: 'currency',
      currency: currency,
      currencyDisplay: this.get('fieldSettings.currencyDisplay')
    };

    if(this.get('precision')) {
      options['minimumFractionDigits'] = this.get('precision');
    }

    return options;
  })
});
