import Model from 'ember-data/model';
import ValidatorMixin from 'ember-attribute-validations/mixins/validator';
import ModelRollbackMixin from '../mixins/model-rollback';
import ModelCopyMixin from '../mixins/model-entity-copy';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';
import { get } from '@ember/object';
import { getModelName } from 'ember-field-components/classes/model-utils';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { isBlank } from '@ember/utils';
import { getOwner } from '@ember/application';

export default Model.extend(ValidatorMixin, ModelRollbackMixin, ModelCopyMixin, LoadableModel, {
  hasViewRoute: computed(function(){
    return this.hasRoute('view');
  }),
  isNew: computed('id', function() {
    return isBlank(this.get('id'));
  }),
  isExisting: computed('isNew', function() {
    return !this.get('isNew');
  }),
  hasErrors: computed('errors.[]', function(){
    return this.get('errors.length') > 0;
  }),
  isDirtyOrDeleted: or('isDirty', 'isDeleted'),
  hasDirtyEmbeddedRelationships(){
    // This function checks whether the embedded relationships (which are being saved in 1 call with the main model) are dirty or deleted.
    const modelName = getModelName(this);
    const store = this.get('store');
    const serializer = store.serializerFor(modelName);
    const attrs = serializer.get('attrs');

    if(isBlank(attrs)){
      return false;
    }

    let returnValue = false;
    for(const relationshipName in attrs) {
      returnValue = this.get(relationshipName).toArray().some((relatedModel) => {
        returnValue = relatedModel.get('isDirtyOrDeleted');
        return returnValue;
      });

      if(returnValue){
        break;
      }
    }

    return returnValue;
  },
  hasRoute(routeName){
    // This property will check if a route exists for this model type based on the name of the model type
    return !isBlank(getOwner(this).lookup(`route:${getModelName(this)}.${routeName}`));
  }
});
