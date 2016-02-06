module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    this.addBowerPackageToProject('pen', '^0.2.2');
    this.addBowerPackageToProject('bootstrap-select', '^1.9.4');
  }
};
