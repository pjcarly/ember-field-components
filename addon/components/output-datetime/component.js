import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

const { Component, computed, inject, isBlank } = Ember;

export default Component.extend(OutputComponent, {
  type: 'datetime',
  fieldSettings: inject.service(),
  dateTimeFormat: computed('format', 'fieldSettings.dateTimeFormat', function(){
    let format = this.get('format');
    if(isBlank(format)){
      return this.get('fieldSettings.dateTimeFormat');
    } else {
      return format;
    }
  })
});
