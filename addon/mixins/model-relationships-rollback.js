import Ember from 'ember';

export default Ember.Mixin.create({
  setOldRelationships: function() {
    let oldRelationships = {};

    Ember.run.schedule('actions', this, function() {
      this.eachRelationship(function(name, descriptor) {
        if (descriptor.kind === 'belongsTo') {
          const recordId = this.belongsTo(name).id();
          const inverseRecord = this.belongsTo(name).belongsToRelationship.inverseRecord;
          const type = Ember.isBlank(inverseRecord) ? null : inverseRecord.modelName;
          oldRelationships[name] = {id: recordId, type: type};
        }
      }, this);

      this.set('_oldRelationships', oldRelationships);
    });
  },
  didCreate: function() {
    this.setOldRelationships();
  },
  didLoad: function() {
    this.setOldRelationships();
  },
  didUpdate: function() {
    this.setOldRelationships();
  },
  rollbackRelationships: function() {
    const oldRelationships = this.get('_oldRelationships');
    this.eachRelationship(function(name, descriptor) {
      if (descriptor.kind === 'belongsTo') {
        const oldRelationship = oldRelationships[name];
        if(!Ember.isBlank(oldRelationship.id)){
          if(this.get('store').hasRecordForId(oldRelationship.type, oldRelationship.id)) {
            const oldRelationshipModel = this.get('store').peekRecord(oldRelationship.type, oldRelationship.id);
            this.set(name, oldRelationshipModel);
          } else {
            Ember.assert(`Tried rolling back relationshp ${name} on ${this.get('name')}, and record with ID ${recordId} of type ${descriptor.type} was not found in the store`);
          }
        } else {
          this.set(name, null);
        }
      }
    }, this);

    this.setOldRelationships();
  },
  hasDirtyRelationships(){
    const oldRelationships = this.get('_oldRelationships');
    let isDirty = false;
    this.eachRelationship(function(name, descriptor) {
      if (descriptor.kind === 'belongsTo') {
        const recordId = this.belongsTo(name).id();
        const inverseRecord = this.belongsTo(name).belongsToRelationship.inverseRecord;
        const type = Ember.isBlank(inverseRecord) ? null : inverseRecord.modelName;
        if(oldRelationships[name].id !== recordId && oldRelationships[name].type !== type){
          isDirty = true;
          return;
        }
      }
    }, this);
    return isDirty;
  }
});
