import Ember from 'ember';

export default Ember.Mixin.create({
  model: null,
  field: null,

  init: function() {
    this._super();
    var model = this.get('model');
    var field = this.get('field');

    model.addObserver(field, this, this.valueChanged);
  },

  willDestroy: function() {
    this._super();
    var model = this.get('model');
    var field = this.get('field');

    model.removeObserver(field, this, this.valueChanged);
  }
});