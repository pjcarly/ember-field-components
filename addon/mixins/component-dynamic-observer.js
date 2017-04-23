import Ember from 'ember';

const { Mixin, isBlank } = Ember;

export default Mixin.create({
  init: function() {
    this._super(...arguments);
    var model = this.get('model');
    var field = this.get('field');

    model.addObserver(field, this, this.valueObserver);
  },

  willDestroy: function() {
    this._super(...arguments);
    var model = this.get('model');
    var field = this.get('field');

    if(!isBlank(model)){
      model.removeObserver(field, this, this.valueObserver);
    }
  },

  valueObserver: function(){
    // this function observes changes in the model of the field, as we can't put dynamic computed properties
    this.notifyPropertyChange('model');
  }
});
