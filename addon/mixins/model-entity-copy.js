import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  copy: function() {
    var model = this.constructor;
    var copy = this.get('store').createRecord(model.modelName || model.typeKey);

    model.eachAttribute(function(attributeName) {
      var attributeValue = this.get(attributeName);

      copy.set(attributeName, attributeValue);
    }.bind(this));

    model.eachRelationship(function(relationshipName, meta) {
      var relationship = this.get(relationshipName);

      if (meta.kind === 'belongsTo') {
        copy.set(relationshipName, relationship);
      }
    }.bind(this));

    return copy;
  }
});
