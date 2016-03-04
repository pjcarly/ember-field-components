module.exports = {
    afterInstall: function () {
        return this.addBowerPackageToProject('bootstrap-select', '^1.9.4')
            .then(function () {
                return this.addBowerPackageToProject('moment', '^2.11.2');
            }.bind(this))
            .then(function () {
                return this.addBowerPackageToProject('eonasdan-bootstrap-datetimepicker', '^4.17.37');
            }.bind(this))
            .then(function () {
                return this.addBowerPackageToProject('ua-parser-js', '^0.7.10');
            }.bind(this));
    }
};
