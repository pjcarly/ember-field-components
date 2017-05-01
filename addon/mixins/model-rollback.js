import Ember from 'ember';

const { Mixin, computed, run, isBlank, assert } = Ember;

export default Mixin.create({
  doRollback(){
    // in case of parent-child bound relationships like invoice/invoice-line, we need to rollback the child models as well
    // This can either be:
    // - Unload parent and child from the store when both are new
    // - Rollback the parent and the child when both existed before
    // - Unload a new child bound to an existing parent
    this.eachRelationship((name, descriptor) => {
      if(descriptor.options.hasOwnProperty('rollback') && descriptor.options.rollback) {
        let childModels = this.hasMany(name).value();
        if(!isBlank(childModels)){
          // Seriously no idea why the next statement needs toArray(), for some reason the enumerable returned above
          // Sometimes gave a null value instead of a child while looping it
          // by first casting it to array, and then looping it, everything worked fine, and all children were found
          childModels.toArray().forEach((childModel) => {
            childModel.doRollback();
          });
        }
      }
    });

    if (this.get('isNew')) {
      this.store.unloadRecord(this);
    } else {
      this.doRollbackAttributes();
      this.doRollbackRelationships();
    }
  },
  doRollbackAttributes(){
    if (this.get('hasDirtyAttributes')) {
      this.rollbackAttributes();
    }
  },
  doRollbackRelationships(){
    if(this.hasDirtyRelationships()){
      this.rollbackRelationships();
    }
  },
  setOldRelationships: function() {
    let oldRelationships = {};

    run.schedule('actions', this, function() {
      this.eachRelationship((name, descriptor) => {
        if (descriptor.kind === 'belongsTo') {
          const recordId = this.belongsTo(name).id();
          const inverseRecord = this.belongsTo(name).belongsToRelationship.inverseRecord;
          const type = isBlank(inverseRecord) ? null : inverseRecord.modelName;
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
    this.eachRelationship((name, descriptor) => {
      if (descriptor.kind === 'belongsTo') {
        const oldRelationship = oldRelationships[name];
        if(!isBlank(oldRelationship.id)){
          if(this.get('store').hasRecordForId(oldRelationship.type, oldRelationship.id)) {
            const oldRelationshipModel = this.get('store').peekRecord(oldRelationship.type, oldRelationship.id);
            this.set(name, oldRelationshipModel);
          } else {
            assert(`Tried rolling back relationship ${name} on ${this.get('name')}, and record with ID ${oldRelationship.id} of type ${descriptor.type} was not found in the store`);
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
        const type = isBlank(inverseRecord) ? null : inverseRecord.modelName;

        if(oldRelationships[name].id !== recordId || oldRelationships[name].type !== type){
          isDirty = true;
          return;
        }
      }
    }, this);
    return isDirty;
  }
});
