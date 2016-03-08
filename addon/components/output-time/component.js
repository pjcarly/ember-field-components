import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

export default Ember.Component.extend(OutputComponent, {
  type: 'time',
  fieldSettings: Ember.inject.service(),
  timeFormat: Ember.computed('format', 'fieldSettings.timeFormat', function(){
    let format = this.get('format');
    if(Ember.isBlank(format)){
      return this.get('fieldSettings.timeFormat');
    } else {
      return format;
    }
  })
});
