import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  resetController(controller) {
    this._super(...arguments);

    let model = controller.get('model');
    model.doRollback();
  }
});
