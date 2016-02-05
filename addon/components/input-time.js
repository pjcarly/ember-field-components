import Ember from 'ember';
import InputComponent from '../mixins/component-input';

export default Ember.Component.extend(InputComponent, {
  computedValue: Ember.computed('value', {
    get: function() {
      var value = this.get('value');

      if (!Ember.isEmpty(value)) {
        return moment.unix(value).format('HH:mm:ss');
      }
    },
    set: function(key, value) {

      if (!Ember.isEmpty(value)) {
        var unix = moment(value, 'HH:mm:ss').unix();
        this.set('value', unix);
      } else {
        this.set('value', null);
      }

      this.sendAction('valueChanged', this.get('value'));
      return value;
    }
  })
});