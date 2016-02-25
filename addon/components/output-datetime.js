import Ember from 'ember';
import OutputComponent from '../mixins/component-output';

export default Ember.Component.extend(OutputComponent, {
  type: 'datetime',
  dateTimeFormat: Ember.computed('format', function(){
    return this.get('format');
  })
});
