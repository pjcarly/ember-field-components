import Component from '@ember/component';
import OutputComponent from '../../mixins/component-output';

export default Component.extend(OutputComponent, {
  type: 'email',
  hideButtons: false
});
