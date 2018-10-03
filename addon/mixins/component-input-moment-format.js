/* global moment */
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

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

      if(this.get('valueChanged')){
        this.get('valueChanged')(value);
      }
      return value;
    }
  })
});
