import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-default', 'command-button'],
  classNameBindings: ['active'],
  active: false,
  click: function(){
    this.get('action')();
  }
});
