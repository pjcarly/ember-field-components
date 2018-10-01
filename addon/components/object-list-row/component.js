import Ember from 'ember';

import Component from '@ember/component';

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
