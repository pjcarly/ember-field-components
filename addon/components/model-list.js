import Ember from 'ember';
import AsyncModelsComponent from '../mixins/component-async-models';

export default Ember.Component.extend(AsyncModelsComponent, {
  store: Ember.inject.service(),

  modelName: null,

  plural: Ember.computed('modelType', function() {
    var modelType = this.get('modelType');

    if (!Ember.isBlank(modelType) && modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('plural')) {
      return modelType.settings.plural;
    } else {
      return Ember.Inflector.inflector.pluralize(modelType.modelName.capitalize());
    }
  }),

  modelType: Ember.computed('modelName', function() {
    var store = this.get('store');
    var modelName = this.get('modelName');

    var modelType = store.modelFor(modelName);
    Ember.assert('Model type ' + modelName + ' doesn\'t exist', !Ember.isEmpty(modelType));

    return modelType;
  }),

  models: Ember.computed('modelName', '_models', function() {
    if (!this.get('hasCompleted')) {
      this.refreshModels(this.get('modelName'));
    }
    return this.get('_models');
  }),

  columns: Ember.computed('modelType', function() {
    return this.get('modelType').settings.listViews.default.columns;
  }),

  actions: {
    modelSelected: function(model) {
      this.sendAction('modelSelected', model);
    },
    newModel: function() {
      this.sendAction('newModel');
    }
  }
});