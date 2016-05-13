import Ember from 'ember';
import FieldTypeComponent from '../mixins/component-field-type';
import ModelUtils from '../classes/model-utils';

export default Ember.Mixin.create(FieldTypeComponent, {
  inline: false,
  classNameBindings: ['isBlock:form-group'],

  init(){
    this._super(...arguments);
    let isBlock = this.get('isBlock');
    this.set('tagName', (isBlock ? 'div' : 'span'));
  },

  isBlock: Ember.computed('inline', function() {
    return !this.get('inline');
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
