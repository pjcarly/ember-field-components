import Model from 'ember-data/model';
import ValidatorMixin from 'ember-attribute-validations/mixins/validator';
import LoadableModel from 'ember-data-storefront/mixins/loadable-model';
import { computed } from '@ember-decorators/object';
import { or } from '@ember-decorators/object/computed';
import { isBlank } from '@ember/utils';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember-decorators/service';
import FieldInformationService from 'ember-field-components/services/field-information';

export default abstract class BaseModel extends Model.extend(ValidatorMixin, LoadableModel) {
  @service fieldInformation !: FieldInformationService;

  @computed
  get hasViewRoute() {
    return this.hasRoute('view');
  }

  @computed('id')
  get isNew() {
    return isBlank(this.id);
  }

  @computed('isNew')
  get isExisting() {
    return !this.get('isNew');
  }

  @computed('errors.[]')
  get hasErrors() {
    return this.get('errors.length') > 0;
  }

  @or('isDirty', 'isDeleted')
  isDirtyOrDeleted !: boolean;

  /**
   * Rollbacks all dirty attributes, and possible child models that are dirty
   */
  rollback() {
    // We override the rollback method provided by the ember-data-change-tracker
    // Where we rollback child records which have the rollback option in the relationship meta
    this.eachRelationship((name: string, descriptor : any) => {
      if(descriptor.options.hasOwnProperty('rollback') && descriptor.options.rollback) {
        const childModels = this.get(name);
        if(!isBlank(childModels)) {
          // Seriously no idea why the next statement needs toArray(), for some reason the enumerable returned above
          // Sometimes gave a null value instead of a child while looping it
          // by first casting it to array, and then looping it, everything worked fine, and all children were found
          childModels.toArray().forEach((childModel : BaseModel) => {
            childModel.rollback();
          });
        }
      }
    });

    // Now we call the super, which does the rollback on the current model
    super.rollback();
  }

  /**
   * This method makes a copy of the current model, sets all the fields and belongsto relationships the same and returns the copy. The existing model is unchanged
   */
  copy() : BaseModel {
    const modelName = this.fieldInformation.getModelName(this);
    const copy = this.store.createRecord(modelName);

    this.eachAttribute((attributeName : string) => {
      const attributeValue = this.get(attributeName);

      copy.set(attributeName, attributeValue);
    });

    this.eachRelationship((relationshipName: string, meta: any) => {
      const relationship = this.get(relationshipName);

      if (meta.kind === 'belongsTo') {
        copy.set(relationshipName, relationship);
      }
    });

    return copy;
  }

  /**
   * Checks whether any dirty embedded relationships exist on this model
   */
  hasDirtyEmbeddedRelationships() : boolean {
    // This functhasDirtyEmbeddedRelationshipsion checks whether the embedded relationships (which are being saved in 1 call with the main model) are dirty or deleted.
    const modelName = this.fieldInformation.getModelName(this);
    const serializer = this.store.serializerFor(modelName);
    const attrs = serializer.attrs;

    if(isBlank(attrs)) {
      return false;
    }

    let returnValue = false;
    for(const relationshipName in attrs) {
      returnValue = this.hasDirtyEmbeddedRelationship(relationshipName);

      if(returnValue) {
        break;
      }
    }

    return returnValue;
  }


  /**
   * Checks the provided (embedded) relationship for dirtyness
   * @param relationshipName The relationship you want to check
   */
  hasDirtyEmbeddedRelationship(relationshipName: string) : boolean {
    return this.get(relationshipName).toArray().some((relatedModel: BaseModel) => {
      return relatedModel.isDirtyOrDeleted;
    });
  }

  /**
   * Checks if a modelroute exists
   * @param routeName THe route
   */
  hasRoute(routeName: string) : boolean {
    // This property will check if a route exists for this model type based on the name of the model type
    return !isBlank(getOwner(this).lookup(`route:${this.fieldInformation.getModelName(this)}.${routeName}`));
  }
}
