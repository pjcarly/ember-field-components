import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

const { Component, inject, computed } = Ember;
const { service } = inject;

export default Component.extend(OutputComponent, {
  fieldSettings: service(),
  type: 'number',
  format: computed('fieldSettings.numberFormat', function(){
    return this.get('fieldSettings.numberFormat');
  })
});
