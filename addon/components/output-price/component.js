import OutputComponent from '../../mixins/component-output';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend(OutputComponent, {
  fieldInformation: service(),
  type: 'number',
  numberOptions: computed('fieldInformation.currencyDisplay', 'fieldInformation.defaultCurrency', 'currency', 'precision', function(){
    const currency = isBlank(this.get('currency')) ? this.get('fieldInformation.defaultCurrency') : this.get('currency');

    let options = {
      style: 'currency',
      currency: currency,
      currencyDisplay: this.get('fieldInformation.currencyDisplay')
    };

    if(this.get('precision')) {
      options['minimumFractionDigits'] = this.get('precision');
    }

    return options;
  })
});
