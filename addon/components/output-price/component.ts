import BaseOutput from "../BaseOutput";
import { computed } from '@ember-decorators/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember-decorators/service';

interface CurrencyOptions {
  style : string;
  currency : string;
  currencyDisplay : string;
  minimumFractionDigits ?: number;
}

export default class OutputTextComponent extends BaseOutput {
  @service fieldInformation !: any;

  type = 'price';
  currency !: string;
  precision !: number;

  @computed('fieldInformation.currencyDisplay', 'fieldInformation.defaultCurrency', 'currency', 'precision')
  get numberOptions() : CurrencyOptions {
    const currency = isBlank(this.currency) ? this.fieldInformation.defaultCurrency : this.currency;

    const options : CurrencyOptions = {
      style: 'currency',
      currency: currency,
      currencyDisplay: this.fieldInformation.currencyDisplay
    }

    if(this.precision) {
      options['minimumFractionDigits'] = this.precision;
    }

    return options;
  }
}
