/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-field-components',
  included: function(app) {
    this._super.included(app);

    if(app.import){
      app.import(app.bowerDirectory + '/bootstrap-select/dist/js/bootstrap-select.js');
      app.import(app.bowerDirectory + '/bootstrap-select/dist/css/bootstrap-select.css');
    }
  }
};
