import Ember from 'ember';

export default Ember.Mixin.create({
  model: null,
  field: null,

  init: function() {
    this._super();
    var model = this.get('model');
    var field = this.get('field');

    model.addObserver(field, this, this.valueObserver);
  },

  willDestroy: function() {
    this._super();
    var model = this.get('model');
    var field = this.get('field');

    model.removeObserver(field, this, this.valueObserver);
  },

  valueObserver: function(){
    // this function observes changes in the model of the field, as we can't put dynamic computed properties
    this.notifyPropertyChange('model');
  }
});
