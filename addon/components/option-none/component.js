import Ember from 'ember';

import Component from '@ember/component';

export default Component.extend({
  tagName: 'option',
  attributeBindings: ['value', 'selected', 'disabled'],
  value: '',
  selected: false
});
