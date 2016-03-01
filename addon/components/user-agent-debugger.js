import Ember from 'ember';

export default Ember.Component.extend({
  userAgent: Ember.computed(function(){
    return Ember.$.ua;
  })
});
