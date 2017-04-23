import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import ComputedValue from '../../mixins/component-computed-value';

const { Component } = Ember;

export default Component.extend(InputComponent, ComputedValue, {
  type: 'textarea',
  hasPrefix: false,
  hasSuffix: false
});
