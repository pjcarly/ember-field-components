import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import InputMomentFormat from '../../mixins/component-input-moment-format';

import Component from '@ember/component';

export default Component.extend(InputComponent, InputMomentFormat, {
  type: 'datetime',
  momentFormat: 'YYYY-MM-DDTHH:mm:ss'
});
