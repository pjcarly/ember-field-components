/* global moment */
import Ember from 'ember';

export default Ember.Mixin.create({
  momentFormat: null,

  computedValue: Ember.computed('value', {
    get: function() {
      var value = this.get('value');

      if (!Ember.isEmpty(value) && (value instanceof Date)) {
        return moment(value).format(this.get('momentFormat'));
      }
    },
    set: function(key, value) {

      if (!Ember.isEmpty(value)) {
        var date = moment(value, this.get('momentFormat')).toDate();
        this.set('value', date);
      } else {
        this.set('value', null);
      }

      this.sendAction('valueChanged', this.get('value'));
      return value;
    }
  })
});
