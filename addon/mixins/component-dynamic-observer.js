import Mixin from '@ember/object/mixin';
import { isBlank } from '@ember/utils';

export default Mixin.create({
  init() {
    this._super(...arguments);
    const model = this.get('model');
    const field = this.get('field');

    model.addObserver(field, this, this.valueObserver);
  },

  willDestroy() {
    this._super(...arguments);
    const model = this.get('model');
    const field = this.get('field');

    if(!isBlank(model)){
      model.removeObserver(field, this, this.valueObserver);
    }
  },

  valueObserver(){
    // this function observes changes in the model of the field, as we can't put dynamic computed properties
    this.notifyPropertyChange('model');
  }
});
