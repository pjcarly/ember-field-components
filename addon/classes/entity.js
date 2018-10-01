import Ember from 'ember';
import DS from 'ember-data';
import ValidatorMixin from 'ember-attribute-validations/mixins/validator';
import ModelRollbackMixin from '../mixins/model-rollback';
import ModelCopyMixin from '../mixins/model-entity-copy';

import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
const { Model } = DS;

export default Model.extend(ValidatorMixin, ModelRollbackMixin, ModelCopyMixin, {
  isNew: computed('id', function() {
    return isBlank(this.get('id'));
  }),
  isExisting: computed('isNew', function() {
    return !this.get('isNew');
  }),
  hasErrors: computed('errors.[]', function(){
    return this.get('errors.length') > 0;
  })
});
