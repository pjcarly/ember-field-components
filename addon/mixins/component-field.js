import Ember from 'ember';
import FieldTypeComponent from '../mixins/component-field-type';
import ModelUtils from '../classes/model-utils';

export default Ember.Mixin.create(FieldTypeComponent, {
  model: null,
  field: null,
  inline: false,
  link: null,
  label: null,

  init: function(){
    this._super(...arguments);

    let classes = this.get('class');
    if(Ember.isBlank(classes)){
      this.classNameBindings = [];
    } else {
      this.classNameBindings = classes.split(' ');
    }
  },

  isNotInline: Ember.computed('inline', function() {
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
