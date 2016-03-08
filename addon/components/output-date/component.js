import Ember from 'ember';
import OutputComponent from '../mixins/component-output';

export default Ember.Component.extend(OutputComponent, {
  type: 'date',
  fieldSettings: Ember.inject.service(),
  dateFormat: Ember.computed('format', 'fieldSettings.dateFormat', function(){
    let format = this.get('format');
    if(Ember.isBlank(format)){
      return this.get('fieldSettings.dateFormat');
    } else {
      return format;
    }
  })
});
