import Ember from 'ember';

export default Ember.Mixin.create({
  hasCompleted: false,
  isLoading: true,
  _models: null,

  refreshModels: function(modelName, parameters) {
    var store = this.get('store');
    this.set('isLoading', true);

    var promise;
    if (Ember.isEmpty(parameters)) {
      promise = store.findAll(modelName);
    } else {
      promise = store.query(modelName, parameters);
    }

    promise.then(function(results) {
      this.set('isLoading', false);
      this.set('hasCompleted', 'true');
      this.set('_models', results);
    }.bind(this), function() {
      this.set('isLoading', false);
      this.set('hasCompleted', 'true');
    }.bind(this));
  }
});