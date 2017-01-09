import Ember from 'ember';

export default Ember.Mixin.create({
  resetController(controller) {
    this._super(...arguments);

    let model = controller.get('model');
    model.doRollback();
  }
});
