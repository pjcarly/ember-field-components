import Ember from 'ember';

const { Mixin, computed } = Ember;

export default Mixin.create({
  computedValue: computed('value', {
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
