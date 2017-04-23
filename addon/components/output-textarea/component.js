import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

const { Component } = Ember;

export default Component.extend(OutputComponent, {
  type: 'textarea'
});
