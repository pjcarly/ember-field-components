import Ember from 'ember';

export default Ember.Mixin.create({
  momentFormat: null,

  computedValue: Ember.computed('value', {
    get: function() {
      var value = this.get('value');

      if (!Ember.isEmpty(value)) {
        return moment.unix(value).format(this.get('momentFormat'));
      }
    },
    set: function(key, value) {

      if (!Ember.isEmpty(value)) {
        var unix = moment(value, this.get('momentFormat')).unix();
        this.set('value', unix);
      } else {
        this.set('value', null);
      }

      this.sendAction('valueChanged', this.get('value'));
      return value;
    }
  })
});
