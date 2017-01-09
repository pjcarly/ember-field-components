import Ember from 'ember';
import DS from 'ember-data';
import ValidatorMixin from 'ember-attribute-validations/mixins/validator';
import ModelRollbackMixin from '../mixins/model-rollback';
import ModelCopyMixin from '../mixins/model-entity-copy';

export default DS.Model.extend(ValidatorMixin, ModelRollbackMixin, ModelCopyMixin, {
  isNew: Ember.computed('id', function() {
    return Ember.isBlank(this.get('id'));
  }),
  isExisting: Ember.computed('isNew', function() {
    return !this.get('isNew');
  })
});
