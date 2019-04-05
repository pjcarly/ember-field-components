module.exports = {
  // Fix: https://github.com/ember-cli/ember-cli/pull/3846/files
  normalizeEntityName(entityName) {
    return entityName;
  },
  afterInstall() {
    return this.addPackagesToProject([
      { name: 'autosize', target: '^4.0.2' },
      { name: 'bootstrap', target: '^4.3.1' },
      { name: 'eonasdan-bootstrap-datetimepicker', target: '^4.17.47' },
      { name: 'bootstrap-slider', target: '^10.6.1' }
    ]);
  }
};
