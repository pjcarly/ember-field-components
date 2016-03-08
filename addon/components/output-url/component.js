import Ember from 'ember';
import OutputComponent from '../mixins/component-output';

export default Ember.Component.extend(OutputComponent, {
  type: 'url',
  hasOutputButton: true,
  displayHttp: Ember.computed('value', function(){
    let value = this.get('value');
    return !Ember.isBlank(value) && value.substring(0, 7) !== 'http://';
  })
});
