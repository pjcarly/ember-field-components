import Ember from 'ember';
import InputComponent from '../mixins/component-input';
import ComputedValue from '../mixins/component-computed-value';

export default Ember.Component.extend(InputComponent, ComputedValue, {
  type: 'password'
});
