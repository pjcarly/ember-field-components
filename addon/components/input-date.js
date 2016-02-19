import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  type: 'date',
  computedValue: Ember.computed('value', {
    get: function() {
      var value = this.get('value');

      if (!Ember.isEmpty(value)) {
        return moment.unix(value).format('YYYY-MM-DD');
      }
    },
    set: function(key, value) {
      if (!Ember.isEmpty(value)) {
        var unix = moment(value, 'YYYY-MM-DD').unix();
        this.set('value', unix);
      } else {
        this.set('value', null);
      }

      this.sendAction('valueChanged', this.get('value'));
      return value;
    }
  })
});
