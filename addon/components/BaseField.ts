import Component from '@ember/component';
import Store from 'ember-data/store';
import Model from 'ember-data/model';
import FieldInformation from 'ember-field-components/services/field-information';
import { inject as service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object';
import { assert } from '@ember/debug';
import { isBlank } from '@ember/utils';
import { FieldOptionsInterface } from 'ember-field-components/services/field-information';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default abstract class BaseField extends Component {
  @service store!: Store;
  @service fieldInformation !: FieldInformation;

  /**
   * The model you want to render a field for
   */
  model !: Model;

  /**
   * The fieldname (attribute) of the model you want to render a field for
   */
  field !: string;

  /**
   * This flag renders the Field inline. No Label will be added.
   */
  inline : boolean = false;

  /**
   * The class you want to give the label accompanying the field
   */
  labelClass: string = 'control-label';

  /**
   * The CSS class you want to give to the wrapper element of the input-field component
   */
  class: string = '';

  /**
   * A hash containing possible options depending on the implementation
   */
  options: any = {};

  /**
   * Returns the dasherized name of the model class
   */
  @computed('model')
  get modelName() : string {
    return this.fieldInformation.getModelName(this.model);
  }

  /**
   * Returns the model class looked up from the ember-data store.
   */
  @computed('modelName')
  get modelClass() : any {
    return this.fieldInformation.getModelClass(this.modelName);
  }

  /**
   * The type of Field is returned. This is the attribute type provided in the modelclass definition
   */
  @computed('modelType', 'field')
  get type() : string | undefined {
    // in the meta we find information about the property
    const meta = this.modelClass.metaForProperty(this.field);
    if (meta) {
      if (meta.isAttribute) {
        let returnValue = meta.type;
        if(!isBlank(returnValue)){
          // support for ember-data-model-fragments
          returnValue = returnValue.replace('-mf-fragment$', '');
        }

        return returnValue;
      } else if (meta.isRelationship) {
        return meta.kind;
      } else { // computed property
        assert('Computed properties you want to use in a input or output component, should have the meta information defined via .meta', meta.hasOwnProperty('type'));
        return meta.type;
      }
    }

    assert('No field type found, attribute or relationshipo not defined on model?');
    return;
  }

  @computed('modelName', 'field')
  get fieldOptions() : FieldOptionsInterface {
    return this.fieldInformation.getFieldOptions(this.modelName, this.field);
  }

  @computed('fieldOptions')
  get isReadOnly() : boolean {
    return this.fieldInformation.getFieldIsReadOnly(this.fieldOptions);
  }

  @computed('fieldOptions')
  get isRequired() : boolean {
    return this.fieldInformation.getFieldIsRequired(this.fieldOptions);
  }

  @computed('model.errors.[]', 'field')
  get hasError() : boolean {
    const errors = this.model.get('errors');
    return errors.has(this.field);
  }

  @computed('fieldOptions')
  get widgetName() : string | undefined {
    const fieldOptions = this.fieldOptions;

    return fieldOptions.hasOwnProperty('widget') ? fieldOptions.widget : undefined;
  }
}
