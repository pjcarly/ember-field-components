import BaseOutput from "../BaseOutput";
import { computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import FieldInformationService from "dummy/services/field-information";

export default class OutputTextComponent extends BaseOutput {
  @service fieldInformation !: FieldInformationService;

  type = 'price';
  currency !: string;
  precision !: number;

  @computed('fieldInformation.defaultCurrency', 'currency')
  get currencyComputed() : string {
    if(this.currency) {
      return this.currency;
    } else {
      return this.fieldInformation.defaultCurrency;
    }
  }

  @computed('options.minimumDigits')
  get minimumDigits() : number | undefined {
    if(this.options.minimumDigits) {
      return this.options.minimumDigits;
    }

    return;
  }
}
