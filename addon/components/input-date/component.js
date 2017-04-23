import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';

const { Component } = Ember;

export default Component.extend(InputComponent, InputMomentFormat, {
  type: 'date',
  momentFormat: 'YYYY-MM-DD',
});
