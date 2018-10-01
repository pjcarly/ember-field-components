import Ember from 'ember';
import InputComponent from '../../mixins/component-input';
import ComputedValue from '../../mixins/component-computed-value';

import Component from '@ember/component';

export default Component.extend(InputComponent, ComputedValue, {
  type: 'url'
});
