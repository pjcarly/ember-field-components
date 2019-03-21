import Service from '@ember/service';
import Store from 'ember-data/store';
import Model from 'ember-data/model';
import { inject as service } from '@ember-decorators/service';
import { isBlank } from '@ember/utils';
import { get } from '@ember/object';
import { assert } from '@ember/debug';
import SelectOption from 'ember-field-components/interfaces/SelectOption';

export interface FieldOptionsInterface {
  readOnly: boolean;
  validation: FieldValidationInterface;
  widget: string;
  selectOptions: SelectOption[];
  noneLabel: string;
}

export interface FieldValidationInterface {
  required: boolean;
  decimals: number;
  precision: number;
  min: number;
  max: number;
}

export default class FieldInformationService extends Service {
  @service store !: Store;

  dateFormat : string = 'YYYY-MM-DD';
  dateTimeFormat : string = 'YYYY-MM-DD HH:mm:ss';
  timeFormat : string = 'HH:mm:ss';
  locale : string = 'nl-BE';
  currencyDisplay : string = 'symbol';
  defaultCurrency : string = 'EUR';
  availableCurrencies : string[] = ['EUR', 'USD', 'GBP'];

  /**
   * Returns the dasherized name of the model class
   * @param model The model you want the dasherized name for
   */
  getModelName(model: Model){
    assert('No model provided for getModelName', !isBlank(model));
    return model.constructor.modelName;
  }

  /**
   * Returns the model class looked up from the ember-data store.
   * @param modelName The dasherized string name of your model
   */
  getModelClass(modelName: string) {
    return this.store.modelFor(modelName);
  }

  /**
   * Returns the fieldOptions that were defined in the attribute definition, this function returns the object that was defined in the modelclass definition.
   * @param modelName The dasherized string name of your model
   */
  getFieldOptions(modelName: string, field: string) : FieldOptionsInterface {
    const modelClass = this.getModelClass(modelName);

    // First we need to find out if the field is an Attribute or a Relationship
    let fieldMeta;

    const modelAttributes = get(modelClass, 'attributes');
    const modelRelationships = get(modelClass, 'relationshipsByName');

    if(modelAttributes.has(field)) {
      // The field is an attribute
      fieldMeta = modelAttributes.get(field);
    }
    else if(modelRelationships.has(field)) {
      // The field is a relationship
      fieldMeta = get(modelRelationships.get(field), 'meta');
    }

    assert(`Field options for field ${field} on model ${modelName} not found, it is not defined as an attribute or relationship`, !isBlank(fieldMeta));

    return fieldMeta.options;
  }

  /**
   * Checks if a field on a model is read only
   * @param FieldOptionsInterface The field meta information. You can get this via getFieldOptions
   */
  getFieldIsReadOnly(options: FieldOptionsInterface) : boolean {
    return options.hasOwnProperty('readOnly') && options.readOnly === true;
  }

  /**
   * Checks if a field is required
   * @param options
   */
  getFieldIsRequired(options: FieldOptionsInterface) : boolean {
    return options.hasOwnProperty('validation') && options.validation.required === true;
  }
}
