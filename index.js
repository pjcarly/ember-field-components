/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');

module.exports = {
    name: 'ember-field-components',
    isDevelopingAddon: function () {
        return true;
    },
    included: function (app) {
        this._super.included(app);

        app.import(app.bowerDirectory + '/moment/moment.js');
        app.import(app.bowerDirectory + '/ua-parser-js/src/ua-parser.js');

        app.import(app.bowerDirectory + '/bootstrap-select/dist/js/bootstrap-select.js');
        app.import(app.bowerDirectory + '/bootstrap-select/dist/css/bootstrap-select.css');

        app.import(app.bowerDirectory + '/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js');
        app.import(app.bowerDirectory + '/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css');
    },
    treeForTemplates: function () {
        return new Funnel(this.project.root + '/node_modules/'+this.name+'/app', {
            include: ['**/*.hbs'],

            getDestinationPath: function (relativePath) {
                if (relativePath.indexOf('/template.hbs') !== -1) {
                    // Remove ".template" from the path, eg: pods/posts/template.hbs => templates/posts.hbs
                    return relativePath.substr(0, relativePath.lastIndexOf('/')) + '.hbs';
                } else {
                    return relativePath;
                }
            }
        });
    }
};
