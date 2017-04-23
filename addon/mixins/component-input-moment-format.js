/* global moment */
import Ember from 'ember';

const { Mixin, computed, isBlank } = Ember;

export default Mixin.create({
  computedValue: computed('value', {
    get: function() {
      var value = this.get('value');

      if (!isBlank(value) && (value instanceof Date)) {
        return moment(value).format(this.get('momentFormat'));
      }
    },
    set: function(key, value) {

      if (!isBlank(value)) {
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
