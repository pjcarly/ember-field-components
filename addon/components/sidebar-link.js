import Ember from 'ember';
import {
  getStringBeforeFirstDot
}
from '../classes/string-utils';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active'],
  isActive: Ember.computed('currentMainRouteName', 'mainRouteName', function() {
    var currentMainRouteName = this.get('currentMainRouteName');
    var mainRouteName = this.get('mainRouteName');

    return currentMainRouteName === mainRouteName;
  }),
  mainRouteName: Ember.computed('route', function() {
    var route = this.get('route');
    return route;
  }),
  currentMainRouteName: Ember.computed('controller.router.currentRouteName', function() {
    var currentRouteName = this.get('controller.router.currentRouteName');
    var currentMainRouteName;
    if (currentRouteName.indexOf('.') === -1) { // no dot in the route
      currentMainRouteName = currentRouteName;
    } else {
      currentMainRouteName = getStringBeforeFirstDot(currentRouteName);
    }

    if (Ember.isBlank(currentMainRouteName)) {
      currentMainRouteName = 'index';
    }

    return currentMainRouteName;
  }),
  actions: {
    goToRoute: function(route) {
      this.sendAction('target', route, this.model);
    }
  }
});