import Ember from 'ember';
import InputComponent from '../../mixins/component-input';

import Component from '@ember/component';

export default Component.extend(InputComponent, {
  type: 'button-group',
  actions: {
    valueChanged: function(value) {
      this.sendAction('valueChanged', value);
    }
  }
});
