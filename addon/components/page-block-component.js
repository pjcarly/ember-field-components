import Ember from 'ember';

export default Ember.Component.extend({
  rendered: true,

  isVisible: Ember.computed('rendered', function() {
    return this.get('rendered');
  })
});