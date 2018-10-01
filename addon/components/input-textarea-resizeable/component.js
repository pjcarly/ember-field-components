/* globals autosize */
import Component from '@ember/component';
import InputComponent from '../../mixins/component-input';
import ComputedValue from '../../mixins/component-computed-value';
import $ from 'jquery';

export default Component.extend(InputComponent, ComputedValue, {
  type: 'textarea',
  hasPrefix: false,
  hasSuffix: false,
  didInsertElement(){
    this._super(...arguments);
    autosize($('textarea'));
  }
});
