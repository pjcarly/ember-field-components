import Ember from 'ember';
import OutputComponent from '../mixins/component-output';

export default Ember.Component.extend(OutputComponent, {
  fieldSettings: Ember.inject.service('ember-field-components/field-settings'),
  type: 'time',
  timeFormat: Ember.computed('format', function(){
    return this.get('fieldSettings.timeFormat');
  })
});
