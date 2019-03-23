import Model from 'ember-data/model';
import { isBlank } from '@ember/utils';

export default abstract class BaseModel extends Model {
  /**
   * Rollbacks all dirty attributes, and possible child models that are dirty
   */
  rollback(){
    // We override the rollback method provided by the ember-data-change-tracker
    // Where we rollback child records which have the rollback option in the relationship meta
    this.eachRelationship((name, descriptor) => {
      if(descriptor.options.hasOwnProperty('rollback') && descriptor.options.rollback) {
        const childModels = this.get(name);
        if(!isBlank(childModels)){
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
    this._super(...arguments);
  }
}
