import Mixin from '@ember/object/mixin';
import FieldTypeComponent from '../mixins/component-field-type';
import { computed } from '@ember/object';

export default Mixin.create(FieldTypeComponent, {
  classNameBindings: ['isBlock:form-group', 'componentClassName'],

  init(){
    this._super(...arguments);
    this.set('tagName', (this.get('isBlock') ? 'div' : 'span'));
  },

  isBlock: computed('inline', function() {
    return !this.get('inline');
  }),

  componentClassName: computed('componentName', 'fieldType', function(){
    const { componentName, fieldType } = this.getProperties('componentName', 'fieldType');

    return `${fieldType}-field ${componentName}`;
  })
});
