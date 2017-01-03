/* globals autosize */
import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import ComputedValue from '../../mixins/component-computed-value';

export default Ember.Component.extend(InputComponent, ComputedValue, {
  type: 'textarea',
  hasPrefix: false,
  hasSuffix: false,
  didInsertElement(){
    this._super(...arguments);
    autosize(Ember.$('textarea'));
  }
});
