import Ember from 'ember';
import DS from 'ember-data';
import ValidatorMixin from 'ember-cli-data-validation/mixins/validator';
import ModelRelationshipsRollbackMixin from '../mixins/model-relationships-rollback';
import ModelCopyMixin from '../mixins/model-entity-copy';

var Entity = DS.Model.extend(ValidatorMixin, ModelRelationshipsRollbackMixin, ModelCopyMixin, {
  isNew: Ember.computed('id', function() {
    return Ember.isBlank(this.get('id'));
  }),
  isExisting: Ember.computed('isNew', function() {
    return !this.get('isNew');
  })
});

export default Entity;
