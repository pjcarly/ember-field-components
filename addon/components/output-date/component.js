import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

import Component from '@ember/component';
import { computed } from '@ember/object';

import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

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
