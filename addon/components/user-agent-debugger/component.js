import Ember from 'ember';

const { Component, computed, $ } = Ember;

export default Component.extend({
  userAgent: computed(function(){
    return $.ua;
  })
});
