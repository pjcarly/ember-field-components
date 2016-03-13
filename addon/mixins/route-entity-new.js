import Ember from 'ember';
import EntityEditRoute from '../mixins/route-entity-edit';
import {
  getModelNameFromModel
}
from '../classes/utils';

export default Ember.Mixin.create(EntityEditRoute, {
  routeCache: Ember.inject.service('route-cache'),
  recachedModelCopy: null,

  model: function() {
    const cachedModel = this.get('routeCache').get('model');

    let entity;
    if (Ember.isNone(cachedModel)) {
      entity = this.store.createRecord(this.get('entityName'), {});
    } else {
      entity = cachedModel;
      this.set('recachedModelCopy', cachedModel.copy());
      this.get('routeCache').set('model', null);
    }

    return entity;
  },

  afterModel: function() {
    this.setPageTitle('New ' + this.get('entityName'));
  },

  actions: {
    updateMainCardMenu: function(menuItems) {
      menuItems.push({
        action: 'index',
        icon: 'zmdi-view-list-alt'
      });
      return true;
    },
    cancel: function() {
      const cachedReturnModel = this.get('routeCache').get('returnRouteModel');
      let recachedModelCopy = this.get('recachedModelCopy');
      let model = this.controller.get('model');
      let modelName;

      if (!Ember.isNone(recachedModelCopy)) {
        recachedModelCopy.rollbackAttributes();
      }

      if (Ember.isNone(cachedReturnModel)) {
        modelName = getModelNameFromModel(model);
        model.rollbackAttributes();
        this.transitionTo(modelName + '.index');
      } else {
        modelName = getModelNameFromModel(cachedReturnModel);
        model.rollbackAttributes();
        this.get('routeCache').set('returnRouteModel', null);
        this.transitionTo(modelName + '.view', cachedReturnModel);
      }
    },
    saveAndNew: function() {
      // Check if there is a cachedModel, and set it aswell if needed
      if (!Ember.isBlank(this.get('recachedModelCopy'))) {
        this.get('routeCache').set('model', this.get('recachedModelCopy'));
      }

      let model = this.controller.get('model');

      model.save().then(function() {
        Ember.get(this, 'flashMessages').success('Record successfully saved.');
        this.refresh();
      }.bind(this), function() {
        Ember.get(this, 'flashMessages').danger('Something went wrong.');
      }.bind(this));
    },
    save: function() {
      let recachedModelCopy = this.get('recachedModelCopy');
      if (!Ember.isNone(recachedModelCopy)) {
        recachedModelCopy.rollbackAttributes();
      }

      return this._super(...arguments);
    }
  }
});
