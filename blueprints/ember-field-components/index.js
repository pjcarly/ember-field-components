module.exports = {
  // Fix: https://github.com/ember-cli/ember-cli/pull/3846/files
  normalizeEntityName(entityName) {
    return entityName;
  },
  afterInstall() {
    var addBowerPackageToProject = this.addBowerPackageToProject.bind(this);

    // return this.addPackagesToProject([
    //   { name: 'bootstrap-select', target: '^1.9.4' },
    //   { name: 'moment', target: '^2.11.2' },
    //   { name: 'eonasdan-bootstrap-datetimepicker', target: '^4.17.37' },
    // ]);

    return addBowerPackageToProject('eonasdan-bootstrap-datetimepicker', '^4.17.37');
  }
};
