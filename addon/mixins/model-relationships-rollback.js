import Ember from 'ember';

export default Ember.Mixin.create({
  setOldRelationships: function() {
    let oldRelationships = {};

    Ember.run.schedule('actions', this, function() {
      this.eachRelationship(function(name, descriptor) {
        if (descriptor.kind === 'belongsTo') {
          const recordId = this.belongsTo(name).id();
          oldRelationships[name] = recordId;
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
        const recordId = oldRelationships[name];
        if(!Ember.isBlank(recordId)){
          if(this.get('store').hasRecordForId(descriptor.type, recordId)) {
            const oldRelationshipModel = this.get('store').peekRecord(descriptor.type, recordId);
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

        if(oldRelationships[name] !== recordId){
          isDirty = true;
          return;
        }
      }
    }, this);
    return isDirty;
  }
});
