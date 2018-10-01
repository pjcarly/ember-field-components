/* globals autosize */
import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import ComputedValue from '../../mixins/component-computed-value';

import Component from '@ember/component';
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
