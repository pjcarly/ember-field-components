import Ember from 'ember';

export default Ember.Mixin.create({
  computedValue: Ember.computed('value', {
    get: function() {
      var value = this.get('value');
      return value;
    },
    set: function(key, value) {
      this.set('value', value);
      this.sendAction('valueChanged', value);
      return value;
    }
  })
});
