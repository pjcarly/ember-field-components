import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-default', 'command-button'],
  classNameBindings: ['active'],
  click: function(){
    this.get('action')();
  }
});
