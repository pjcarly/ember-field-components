import Component from '@ember/component';
import FieldInputComponent from '../../mixins/component-field-input-super';
import { hasWidget } from '../../classes/model-utils';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import { getModelName } from 'ember-field-components/classes/model-utils';
import { capitalize } from '@ember/string';

export default Component.extend(FieldInputComponent, {
  intl: service(),
  selectOptions: computed('fieldOptions', 'value', 'intl.locale', function() {
    const fieldOptions = this.get('fieldOptions');
    const selectOptions = [];

    if(!fieldOptions.hasOwnProperty('selectOptions')){
      return;
    }

    fieldOptions.selectOptions.forEach((fieldSelectOption) => {
      const selectOption = {};
      selectOption.value = fieldSelectOption.value;
      selectOption.label = this.getSelectOptionLabel(fieldSelectOption.value);
      selectOptions.push(selectOption);
    });

    return selectOptions;
  }),
  getSelectOptionLabel(value){
    const { modelType, intl, field } = this.getProperties('modelName', 'intl', 'field');

    if(intl.exists(`ember-field-components.${modelType}.select.${field}.${value}`)) {
      return intl.t(`ember-field-components.${modelType}.select.${field}.${value}`);
    } else if(intl.exists(`ember-field-components.global.select.${field}.${value}`)) {
      return intl.t(`ember-field-components.global.select.${field}.${value}`);
    } else {
      return capitalize(value);
    }
  },
  modelName: computed('model', function(){
    return getModelName(this.get('model'));
  }),
  isButtonGroup: computed(function() {
    const fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'button-group');
  }),
  isSelectSearch: computed(function() {
    const fieldAttributeOptions = this.get('fieldAttributeOptions');
    return hasWidget(fieldAttributeOptions, 'select-search');
  }),
  none: computed(function(){
    const fieldOptions = this.get('fieldOptions');
    return fieldOptions.none;
  }),
  actions: {
    valueChanged(value) {
      if (!isBlank(value)) {
        this.set('value', value);
        this.notifyAction(value);
      } else {
        this.set('value', null);
        this.notifyAction(null);
      }
    }
  }
});
