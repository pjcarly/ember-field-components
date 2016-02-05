/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-field-components',
  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/pen/src/pen.js');
    app.import(app.bowerDirectory + '/pen/src/pen.css');
  }
};
