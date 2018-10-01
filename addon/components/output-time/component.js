import Component from '@ember/component';
import OutputComponent from '../../mixins/component-output';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';

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
