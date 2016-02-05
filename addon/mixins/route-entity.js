import Ember from 'ember';
import DefaultRoute from '../mixins/route-default';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {
  getStringBeforeFirstDot
}
from '../classes/string-utils';

export default Ember.Mixin.create(DefaultRoute, AuthenticatedRouteMixin, {
  entityName: Ember.computed(function() {
    let currentRouteName = this.get('routeName');
    let currentMainRouteName = getStringBeforeFirstDot(currentRouteName);
    return currentMainRouteName;
  }),
  modelType: Ember.computed('entityName', function() {
    let store = this.get('store');
    let entityName = this.get('entityName');

    let modelType = store.modelFor(entityName);
    Ember.assert('Model type ' + entityName + ' doesn\'t exist', !Ember.isEmpty(entityName));

    return modelType;
  }),
  plural: Ember.computed('modelType', function() {
    let modelType = this.get('modelType');

    if (!Ember.isBlank(modelType) && modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('plural')) {
      return modelType.settings.plural;
    } else {
      return Ember.Inflector.inflector.pluralize(modelType.modelName.capitalize());
    }
  }),
  afterModel: function() {
    this.setPageTitle(this.get('plural'));
  },
  actions: {
    view: function(model) {
      if (!Ember.isBlank(model)) {
        return true; // bubbleing this to the applicationRoute
      }
      let modelName = this.get('entityName');
      model = this.controller.get('model');
      this.transitionTo(modelName + '.view', model);
    },
    edit: function(model) {
      if (!Ember.isBlank(model)) {
        return true; // bubbleing this to the applicationRoute
      }
      let modelName = this.get('entityName');
      model = this.controller.get('model');
      this.transitionTo(modelName + '.edit', model);
    },
    delete: function(model) {
      if (!Ember.isBlank(model)) {
        return true; // bubbleing this to the applicationRoute
      }
      let modelName = this.get('entityName');
      model = this.controller.get('model');
      this.transitionTo(modelName + '.delete', model);
    },
    new: function() {
      let modelName = this.get('entityName');
      this.transitionTo(modelName + '.new');
    },
    index: function() {
      let modelName = this.get('entityName');
      this.transitionTo(modelName + '.index');
    }
  }
});