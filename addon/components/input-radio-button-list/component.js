import Ember from 'ember';
import InputComponent from '../../mixins/component-input';

import Component from '@ember/component';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Component.extend(InputComponent, {
  type: 'radio-button-list',
  hasPrefix: false,
  hasSuffix: false,
  emptyValue: computed('value', function(){
    return isBlank(this.get('value'));
  }),
  actions: {
    valueChanged: function(value) {
      this.set('value', value);
      this.sendAction('valueChanged', value);
    }
  }
});
