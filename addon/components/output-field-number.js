import Ember from 'ember';
import NumberFieldComponent from '../mixins/component-field-number';
import FieldOutputComponent from '../mixins/component-field-output-super';

export default Ember.Component.extend(NumberFieldComponent, FieldOutputComponent, {
  formatGetter: function(value) {
    if (!Ember.isEmpty(value)) {
      return numeral(value).format(this.get('numberFormat'));
    }
    return value;
  }
});