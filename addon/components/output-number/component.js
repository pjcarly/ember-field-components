import Component from '@ember/component';
import OutputComponent from '../../mixins/component-output';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend(OutputComponent, {
  fieldInformation: service(),
  type: 'number',
  format: computed('fieldInformation.numberFormat', function(){
    return this.get('fieldInformation.numberFormat');
  })
});
