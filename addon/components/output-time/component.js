import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

const { Component, computed, inject, isBlank } = Ember;
const { service } = inject;

export default Component.extend(OutputComponent, {
  type: 'time',
  fieldSettings: service(),
  timeFormat: computed('format', 'fieldSettings.timeFormat', function(){
    let format = this.get('format');
    if(isBlank(format)){
      return this.get('fieldSettings.timeFormat');
    } else {
      return format;
    }
  })
});
