import Component from '@ember/component';
import OutputComponent from '../../mixins/component-output';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Component.extend(OutputComponent, {
  type: 'url',
  hideButtons: false,
  displayHttp: computed('value', function(){
    let value = this.get('value');
    return !isBlank(value) && value.substring(0, 7) !== 'http://' && value.substring(0, 8) !== 'https://';
  })
});
