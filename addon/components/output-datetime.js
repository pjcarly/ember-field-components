import Ember from 'ember';
import OutputComponent from '../mixins/component-output';

export default Ember.Component.extend(OutputComponent, {
  type: 'datetime',
  fieldSettings: Ember.inject.service()
});
