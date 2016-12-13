import Ember from 'ember';
import FieldTypeComponent from '../mixins/component-field-type';
import ModelUtils from '../classes/model-utils';

export default Ember.Mixin.create(FieldTypeComponent, {
  classNameBindings: ['isBlock:form-group', 'componentClassName'],

  init(){
    this._super(...arguments);
    let isBlock = this.get('isBlock');
    this.set('tagName', (isBlock ? 'div' : 'span'));
  },

  isBlock: Ember.computed('inline', function() {
    return !this.get('inline');
  }),

  componentClassName: Ember.computed('componentName', 'fieldType', function(){
    let componentName = this.get('componentName');
    let fieldType = this.get('fieldType');

    return `${fieldType}-field ${componentName}`;
  }),

  labelComputed: Ember.computed('label', 'modelType', 'field', function() {
    let label = this.get('label');
    if(Ember.isBlank(label)){
      let modelType = this.get('modelType');
      let field = this.get('field');

      return ModelUtils.getLabel(modelType, field);
    }
    else {
      return label;
    }
  })
});
