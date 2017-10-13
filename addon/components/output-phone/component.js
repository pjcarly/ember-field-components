import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

const { Component, computed } = Ember;

export default Component.extend(OutputComponent, {
  type: 'phone'
});
