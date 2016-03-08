import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'option',
  attributeBindings: ['disabled', 'selected'],
  disabled: true,
  selected: false
});
