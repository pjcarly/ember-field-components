import Ember from 'ember';
import FieldInputComponent from '../mixins/component-field-input-super';
import ModelUtils from '../classes/model-utils';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  selectOptions: Ember.computed('columns', function(){
    let selectOptions = [];
    let store = this.get('store');
    let field = this.get('field');
    let model = this.get('model');
    let columns = this.get('columns');

    let parentModelTypeName = ModelUtils.getParentModelTypeName(model, field);
    let models = store.peekAll(parentModelTypeName);

    return models;
  }),

  nameColumn: Ember.computed('field', 'model', function(){
    let field = this.get('field');
    let model = this.get('model');

    let parentModelType = ModelUtils.getParentModelType(model, field, this.get('store'));
    return ModelUtils.getNameColumn(parentModelType);
  }),

  columns: Ember.computed('field', 'model', function() {
    let columns = [];
    let field = this.get('field');
    let model = this.get('model');

    let parentModelType = ModelUtils.getParentModelType(model, field, this.get('store'));
    let columnValues = ModelUtils.getDefaultListViewColumns(parentModelType);

    columnValues.forEach(function(columnValue){
      let column = {};
      column.value = columnValue;
      column.label = ModelUtils.getLabel(parentModelType, columnValue);
      columns.push(column);
    });

    return columns;
  }),

  noresults: Ember.computed('field', 'model', function(){
    let field = this.get('field');
    let model = this.get('model');

    let parentModelType = ModelUtils.getParentModelType(model, field, this.get('store'));
    let plural = ModelUtils.getPlural(parentModelType);

    return 'No '+plural+' found';
  }),

  parentModel: Ember.computed('field', 'model', function() {
    let field = this.get('field');
    let model = this.get('model');

    return model.get(field);
  }),

  actions: {
    valueChanged: function(value){
      console.log(value);

      let field = this.get('field');
      let model = this.get('model');

      model.set(field, value);
    }
  }
});
