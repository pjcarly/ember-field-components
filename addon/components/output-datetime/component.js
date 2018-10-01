import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

import Component from '@ember/component';
import { computed } from '@ember/object';

import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend(OutputComponent, {
  type: 'datetime',
  fieldSettings: service(),
  dateTimeFormat: computed('format', 'fieldSettings.dateTimeFormat', function(){
    let format = this.get('format');
    if(isBlank(format)){
      return this.get('fieldSettings.dateTimeFormat');
    } else {
      return format;
    }
  })
});
