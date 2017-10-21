import Ember from 'ember';
import FieldComponent from '../../mixins/component-field';
import { getModelName } from 'ember-field-components/classes/model-utils';

const { Component } = Ember;
const { computed } = Ember;
const { String } = Ember;
const { dasherize } = String;

export default Component.extend(FieldComponent, {
  fieldType: 'output',
  classNameBindings: ['inline', 'fieldClasses'],
  fieldClasses: computed('model', 'field', function(){
    return getModelName(this.get('model')) + '-' + dasherize(this.get('field'));
  }),
});
