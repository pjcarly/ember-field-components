import Component from '@ember/component';
import FieldComponent from '../../mixins/component-field';
import { getModelName } from 'ember-field-components/classes/model-utils';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';

export default Component.extend(FieldComponent, {
  fieldType: 'output',
  classNameBindings: ['inline', 'fieldClasses'],
  fieldClasses: computed('model', 'field', function(){
    return getModelName(this.get('model')) + '-' + dasherize(this.get('field'));
  }),
});
