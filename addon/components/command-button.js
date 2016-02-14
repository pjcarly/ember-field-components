import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn-default'],
  classNameBindings: ['active'],
  active: false,
  actions: {
    click: function() {
      this.get('action')();
    }
  }
});
