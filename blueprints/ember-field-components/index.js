module.exports = {
    // Fix: https://github.com/ember-cli/ember-cli/pull/3846/files
    normalizeEntityName: function (entityName) {
        return entityName;
    },
    afterInstall: function () {
        var addBowerPackageToProject = this.addBowerPackageToProject.bind(this);

        return addBowerPackageToProject('bootstrap-select', '^1.9.4')
            .then(function () {
                return addBowerPackageToProject('moment', '^2.11.2');
            })
            .then(function () {
                return addBowerPackageToProject('eonasdan-bootstrap-datetimepicker', '^4.17.37');
            })
            .then(function () {
                return addBowerPackageToProject('ua-parser-js', '^0.7.10');
            });
    }
};
