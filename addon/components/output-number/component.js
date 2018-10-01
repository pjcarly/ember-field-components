import Component from '@ember/component';
import OutputComponent from '../../mixins/component-output';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend(OutputComponent, {
  fieldSettings: service(),
  type: 'number',
  format: computed('fieldSettings.numberFormat', function(){
    return this.get('fieldSettings.numberFormat');
  })
});
