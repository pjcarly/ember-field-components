import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'option',
  attributeBindings: ['value', 'selected', 'disabled'],
  value: '',
  selected: false
});
