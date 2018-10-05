import Mixin from '@ember/object/mixin';

export default Mixin.create({
  resetController(controller) {
    this._super(...arguments);

    let model = controller.get('model');
    model.rollback();
  }
});
