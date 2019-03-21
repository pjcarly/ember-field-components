import Component from '@ember/component';
import OutputComponent from '../../mixins/component-output';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

export default Component.extend(OutputComponent, {
  type: 'datetime',
  fieldInformation: service(),
  dateTimeFormat: computed('format', 'fieldInformation.dateTimeFormat', function(){
    let format = this.get('format');
    if(isBlank(format)){
      return this.get('fieldInformation.dateTimeFormat');
    } else {
      return format;
    }
  })
});
