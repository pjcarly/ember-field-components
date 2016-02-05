// app/initializers/component-router-injector.js
export default {
  name: 'settings-injector',
  initialize: function(container, application) {
    // Injects all Ember components with a router object:
    application.inject('component', 'settings', 'service:settings');
    application.inject('route', 'settings', 'service:settings');
    application.inject('controller', 'settings', 'service:settings');

    numeral.language('be-nl');
  }
};