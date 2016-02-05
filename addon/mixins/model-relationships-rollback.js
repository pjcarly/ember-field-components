import Ember from 'ember';

export default Ember.Mixin.create({
  rollbackAttributes: function() {
    this._super();
    this.rollbackRelationships();
  },

  rollbackRelationships: function() {
    var model = this;
    model.eachRelationship(function(name, meta) {
      if (meta.kind === 'belongsTo') {
        var oldId = model.get(`${name}Id`);
        if (oldId) {
          model.get(name).then(function(child) {
            if (!(child && child.get('id') === oldId)) {
              model.store.findRecord(name, oldId).then(function(originalRecord) {
                model.set(name, originalRecord);
              });
            }
          });
        }
      }
    });
  },

  // keep a cache of all belongsTo ids before there are any user-initiated changes
  // so we can roll back manually in `rollbackAttributes`
  cacheRelationships: function() {
    var model = this;
    model.eachRelationship(function(name, meta) {
      if (meta.kind === 'belongsTo') {
        model.get(name).then(function(child) {
          if (child && child.get('id')) {
            model.set(`${name}Id`, child.get('id'));
          }
        });
      }
    });
  },

  ready: function() {
    this.cacheRelationships();
  }
});