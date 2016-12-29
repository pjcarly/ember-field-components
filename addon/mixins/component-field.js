import Ember from 'ember';
import FieldTypeComponent from '../mixins/component-field-type';

export default Ember.Mixin.create(FieldTypeComponent, {
  classNameBindings: ['isBlock:form-group', 'componentClassName'],

  init(){
    this._super(...arguments);
    this.set('tagName', (this.get('isBlock') ? 'div' : 'span'));
  },

  isBlock: Ember.computed('inline', function() {
    return !this.get('inline');
  }),

  componentClassName: Ember.computed('componentName', 'fieldType', function(){
    const { componentName, fieldType } = this.getProperties('componentName', 'fieldType');

    return `${fieldType}-field ${componentName}`;
  })
});
