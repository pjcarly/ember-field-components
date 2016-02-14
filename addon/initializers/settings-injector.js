export default {
  name: 'settings-injector',
  initialize: function(application) {
    application.inject('component', 'settings', 'service:settings');
    application.inject('route', 'settings', 'service:settings');
    application.inject('controller', 'settings', 'service:settings');

    numeral.language('be-nl');
  }
};
