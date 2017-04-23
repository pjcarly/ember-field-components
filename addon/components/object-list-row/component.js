import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'tr',
  classNames: ['object-list-row'],

  object: null,
  columns: [],

  actions: {
    click: function() {
      this.sendAction('objectSelected', this.get('object'));
    }
  }
});
