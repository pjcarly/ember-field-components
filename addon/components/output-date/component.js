import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

const { Component, computed, inject, isBlank } = Ember;
const { service } = inject;

export default Component.extend(OutputComponent, {
  type: 'date',
  fieldSettings: service(),
  dateFormat: computed('format', 'fieldSettings.dateFormat', function(){
    let format = this.get('format');
    if(isBlank(format)){
      return this.get('fieldSettings.dateFormat');
    } else {
      return format;
    }
  })
});
