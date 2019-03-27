import Service from '@ember/service';
import Store from 'ember-data/store';
import Model from 'ember-data/model';
import SelectOption from 'ember-field-components/interfaces/SelectOption';
import { inject as service } from '@ember-decorators/service';
import { isBlank } from '@ember/utils';
import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { capitalize } from "@ember/string";

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
  @service intl !: any;

  dateFormat : string = 'YYYY-MM-DD';
  dateTimeFormat : string = 'YYYY-MM-DD HH:mm:ss';
  timeFormat : string = 'HH:mm:ss';
  locale : string = 'nl-BE';
  currencyDisplay : string = 'symbol';
  defaultCurrency : string = 'EUR';
  availableCurrencies : string[] = ['EUR', 'USD', 'GBP'];


  /**
   * Returns the inverse relationshipname for the passed modelname and relationshipname
   * @param modelName The name of the model where the relationship is defined
   * @param relationshipName The relationship you want to lookup the inverse relationshpname for
   */
  getInverseRelationshipName(modelName: string, relationshipName : string) : string | undefined {
    const parent = this.getModelClass(modelName);
    const relationships = parent.relationshipsByName;

    if (relationships.has(relationshipName)) {
      const relationship = relationships.get(relationshipName);
      assert(`No explicit inverse relationship defined for ${relationshipName} on ${modelName}`, !isBlank(relationship.options.inverse));

      return relationship.options.inverse;
    }

    return;
  }

  /**
   * Looks up a hasMany relationship, and returns the modelname for the relationship
   * @param modelName the name of the model where the hasmany is defined
   * @param relationshipName the name of the relationship
   */
  getHasManyModelName(modelName: string, relationshipName: string) : string | undefined {
    const parent = this.getModelClass(modelName);
    const relationships = parent.relationshipsByName;

    if(relationships.has(relationshipName) && relationships.get(relationshipName).kind === 'hasMany') {
      return relationships.get(relationshipName).type;
    }

    return;
  }

  /**
   * Looks up the translations for the plural of a modelname, in case nothing was found, the modelName will be returned again
   * @param modelName THe model name you want the translated plural form of
   */
  getTranslatedPlural(modelName: string) : string {
    if(this.intl.exists(`ember-field-components.${modelName}.plural`)) {
      return this.intl.t(`ember-field-components.${modelName}.plural`);
    }

    return modelName;
  }

  /**
   * Returns the translated value of a field label. If nothing is found, the field will be capitalized
   * @param modelName The name of the model
   * @param field The field
   */
  getTranslatedFieldlabel(modelName : string, field : string) : string {
    if(this.intl.exists(`ember-field-components.${modelName}.fields.${field}`)) {
      return this.intl.t(`ember-field-components.${modelName}.fields.${field}`);
    } else if(this.intl.exists(`ember-field-components.global.fields.${field}`)) {
      return this.intl.t(`ember-field-components.global.fields.${field}`);
    } else {
      return capitalize(field);
    }
  }

  /**
   * You can lookup a translated selectOptionLabel through this function
   * @param modelName Name of the model where the field exists
   * @param field Name of the field
   * @param value The value of the SelectOption
   */
  getTranslatedSelectOptionLabel(modelName : string, field : string, value : string) : string {
    if(this.intl.exists(`ember-field-components.${modelName}.select.${field}.${value}`)) {
      return this.intl.t(`ember-field-components.${modelName}.select.${field}.${value}`);
    } else if(this.intl.exists(`ember-field-components.global.select.${field}.${value}`)) {
      return this.intl.t(`ember-field-components.global.select.${field}.${value}`);
    } else {
      return capitalize(value);
    }
  }

  /**
   * Returns the dasherized name of the model class
   * @param model The model you want the dasherized name for
   */
  getModelName(model: Model) : any {
    assert('No model provided for getModelName', !isBlank(model));
    return model.constructor.modelName;
  }

  /**
   * Returns the model class looked up from the ember-data store.
   * @param modelName The dasherized string name of your model
   */
  getModelClass(modelName: string) : any {
    return this.store.modelFor(modelName);
  }

  /**
   * Returns the model class for the passed model
   * @param model The model you want the modelclass for
   */
  getModelClassForModel(model: Model) : any {
    return this.getModelClass(this.getModelName(model));
  }

  /**
   * Returns an array of default includes defined on the provided modelclass
   * @param modelName The name of the model you want the default includes for
   */
  getDefaultIncludes(modelName: string) : string[] {
    const modelClass = this.getModelClass(modelName);

    if(!isBlank(modelClass)){
      if(modelClass.settings.defaultIncludes){
        return modelClass.settings.defaultIncludes;
      }
    }

    return [];
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
