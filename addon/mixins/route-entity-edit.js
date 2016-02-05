import Ember from 'ember';
import EntityRoute from '../mixins/route-entity';
import {
  getModelNameFromModel
}
from '../classes/utils';

export default Ember.Mixin.create(EntityRoute, {
  resetController: function(controller) {
    let model = controller.get('model');
    if (model.get('isDirty')) {
      model.rollbackAttributes();
    }
    if (model.get('isNew')) {
      this.store.unloadRecord(model);
    }
  },

  actions: {
    updateMainCardMenu: function(menuItems) {
      menuItems.push({
        action: 'view',
        icon: 'zmdi-eye'
      });
      menuItems.push({
        action: 'delete',
        icon: 'zmdi-delete'
      });
      menuItems.push({
        action: 'index',
        icon: 'zmdi-view-list-alt'
      });
      return true;
    },
    cancel: function() {
      let model = this.controller.get('model');
      const modelName = getModelNameFromModel(model);
      model.rollbackAttributes();
      this.transitionTo(modelName + '.view', model);
    },
    save: function() {
      let model = this.controller.get('model');
      let modelName = getModelNameFromModel(model);

      model.save().then(function() {
        this.transitionTo(modelName + '.view', model);
        Ember.get(this, 'flashMessages').success('Record successfully saved.');
      }.bind(this), function() {
        Ember.get(this, 'flashMessages').danger('Something went wrong.');
      }.bind(this));
    }
  }
});