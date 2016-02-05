import Ember from 'ember';
import DS from 'ember-data';
import Attribute from '../classes/attribute';
import ValidatorMixin from 'ember-cli-data-validation/mixins/validator';
import ModelRelationshipsRollbackMixin from '../mixins/model-relationships-rollback';
import ModelMetaMixin from '../mixins/model-meta';
import ModelCopyMixin from '../mixins/model-entity-copy';

var Entity = DS.Model.extend(ValidatorMixin, ModelRelationshipsRollbackMixin, ModelCopyMixin, {
  created: Attribute.setType('datetime', {
    readOnly: true
  }),
  changed: Attribute.setType('datetime', {
    readOnly: true
  }),
  isNew: Ember.computed('id', function() {
    return Ember.isBlank(this.get('id'));
  }),
  isExisting: Ember.computed('isNew', function() {
    return !this.get('isNew');
  })
});

export default Entity;

Entity.reopenClass(ModelMetaMixin);