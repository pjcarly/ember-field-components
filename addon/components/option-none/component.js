import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'option',
  attributeBindings: ['value', 'selected', 'disabled'],
  value: '',
  selected: false
});
