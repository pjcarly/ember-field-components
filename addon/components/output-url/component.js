import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

const { Component, computed, isBlank } = Ember;

export default Component.extend(OutputComponent, {
  type: 'url',
  hideButtons: false,
  displayHttp: computed('value', function(){
    let value = this.get('value');
    return !isBlank(value) && value.substring(0, 7) !== 'http://' && value.substring(0, 8) !== 'https://';
  })
});
