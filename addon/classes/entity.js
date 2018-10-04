import Model from 'ember-data/model';
import ValidatorMixin from 'ember-attribute-validations/mixins/validator';
import ModelRollbackMixin from '../mixins/model-rollback';
import ModelCopyMixin from '../mixins/model-entity-copy';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';
import { getModelName } from 'ember-field-components/classes/model-utils';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

export default Model.extend(ValidatorMixin, ModelRollbackMixin, ModelCopyMixin, LoadableModel, {
  hasRoute: computed(function(){
    // This property will check if a route exists for this model type based on the name of the model type
    return !isBlank(getOwner(this).lookup(`route:${getModelName(this)}`));
  }),
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
