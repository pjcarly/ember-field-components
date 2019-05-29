import InputField from '../input-field/component';
import SelectOption from 'ember-field-components/interfaces/SelectOption';
import FieldInformationService from 'ember-field-components/services/field-information';
import { inject as service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object';
import { isArray } from '@ember/array';
import { defineProperty, computed as classicComputed, observer } from '@ember/object';

export default class InputFieldSelectComponent extends InputField {
  @service fieldInformation !: FieldInformationService;

  dependentValue !: undefined|string;
  selectOptions ?: SelectOption[];

  init() {
    super.init();

    // Here we define a dynamic computed property for the dependentValue if a dependentField is defined
    if(this.dependentField) {
      defineProperty(this, 'dependentValue', classicComputed('model', `model.${this.dependentField}`, {
        get() {
          return this.model.get(this.dependentField);
        }
      }));
    }
  }

  /**
   * Here we define a computed property for the "value", which checks whether the value is found in the
   * selectOptions, and if not, will set the field to NULL.
   * This will only be done for fields with a dependency.
   * And is just a clone of value if no dependency is defined
   */
  @computed('value', 'dependentValue', 'selectOptionsComputed')
  get computedValue() : any {
    if(this.dependentField) {
      let allowedValueFound = false;
      for(const selectOption of this.selectOptionsComputed) {
        if(selectOption.value === this.value) {
          allowedValueFound = true;
          break;
        }
      }

      if(!allowedValueFound) {
        this.set('value', null);
      } else {
        return this.value;
      }
    } else {
      return this.value;
    }
  }

  @computed('fieldOptions', 'intl.locale', 'dependentValue', 'selectOptions')
  get selectOptionsComputed() : SelectOption[] {
    const fieldOptions = this.fieldOptions;
    const selectOptions : SelectOption[] = [];

    if(this.selectOptions) {
      return this.selectOptions;
    } else if(fieldOptions && fieldOptions.hasOwnProperty('selectOptions') && isArray(fieldOptions.selectOptions)) {
      return this.getAllowedSelectOptions(fieldOptions.selectOptions);
    }

    return selectOptions;
  }

  /**
   * Returns the allowed selectOptions based if a dependency is present or not
   * @param selectOptions The selectOptions you want to filter
   */
  getAllowedSelectOptions(selectOptions: SelectOption[]) {
    const returnValues : SelectOption[] = [];

    let allowedValues : string[]|undefined = undefined;
    if(this.dependentField) {
      const dependencies = this.selectOptionDependencies;

      if(dependencies && this.dependentValue && dependencies.has(this.dependentValue)) {
        allowedValues = dependencies.get(this.dependentValue);
      }
    }


    for(const fieldSelectOption of selectOptions) {
      if(allowedValues && !allowedValues.includes(fieldSelectOption.value)) {
        continue;
      }

      const selectOption : SelectOption = {
        value: fieldSelectOption.value
      };

      selectOption.label = this.fieldInformation.getTranslatedSelectOptionLabel(this.modelName, this.field, fieldSelectOption.value);
      returnValues.push(selectOption);
    }

    return returnValues;
  }

  @computed('fieldOptions')
  get selectOptionDependencies() : Map<string, string[]>|undefined {
    const fieldOptions = this.fieldOptions;

    if(!fieldOptions || !fieldOptions.hasOwnProperty('selectOptionDependencies')) {
      return undefined;
    }

    return fieldOptions.selectOptionDependencies;
  }

  @computed('fieldOptions')
  get dependentField() : string|undefined {
    const fieldOptions = this.fieldOptions;

    if(!fieldOptions || !fieldOptions.hasOwnProperty('dependentField')) {
      return undefined;
    }

    return fieldOptions.dependentField;
  }

  @computed('fieldOptions')
  get noneLabel() : string {
    return this.fieldInformation.getTranslatedSelectNoneLabel(this.modelName, this.field);
  }
}
