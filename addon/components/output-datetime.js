import Ember from 'ember';
import OutputComponent from '../mixins/component-output';

export default Ember.Component.extend(OutputComponent, {
  type: 'datetime',
  fieldSettings: Ember.inject.service(),
  dateTimeFormat: Ember.computed('format', 'fieldSettings.dateTimeFormat', function(){
    let format = this.get('format');
    if(Ember.isBlank(format)){
      return this.get('fieldSettings.dateTimeFormat');
    } else {
      return format;
    }
  })
});
