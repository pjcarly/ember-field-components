import Ember from 'ember';
import EntityNewRoute from '../mixins/route-entity-new';
import {
  getModelNameFromModel
}
from '../classes/utils';

export default Ember.Mixin.create(EntityNewRoute, {
  actions: {
    delete: function() {
      const model = this.controller.get('model');
      const modelName = getModelNameFromModel(model);

      model.destroyRecord().then(function() {
        this.transitionTo(modelName + '.index');
        Ember.get(this, 'flashMessages').success('Record successfully deleted.');
      }.bind(this), function(reason) {
        Ember.get(this, 'flashMessages').danger('Something went wrong. (' + reason + ')');
      }.bind(this));
    }
  }
});