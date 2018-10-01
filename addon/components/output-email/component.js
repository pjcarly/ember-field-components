import Ember from 'ember';
import OutputComponent from '../../mixins/component-output';

import Component from '@ember/component';

export default Component.extend(OutputComponent, {
  type: 'email',
  hideButtons: false
});
