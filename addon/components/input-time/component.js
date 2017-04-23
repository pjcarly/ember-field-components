import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';

const { Component } = Ember;

export default Component.extend(InputComponent, InputMomentFormat, {
  type: 'time',
  momentFormat: 'HH:mm:ss'
});
