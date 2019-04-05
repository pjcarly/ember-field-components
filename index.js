'use strict';

module.exports = {
  name: require('./package').name,
  isDevelopingAddon() {
    return true;
  }
  // included(app) {
  //   this._super.included.apply(this, arguments);

  //   app.import('node_modules/autosize/dist/autosize.js');
  //   app.import('node_modules/bootstrap/dist/js/bootstrap.js');
  //   app.import('node_modules/bootstrap/dist/css/bootstrap.css');
  //   app.import('node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js');
  //   app.import('node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
  //   app.import('node_modules/bootstrap-slider/dist/bootstrap-slider.js');
  //   app.import('node_modules/bootstrap-slider/dist/css/bootstrap-slider.css');
  // }
};
