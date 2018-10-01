import OutputComponent from '../../mixins/component-output';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

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
