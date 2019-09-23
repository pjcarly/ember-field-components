import Component from "@ember/component";
import Store from "ember-data/store";
import Model from "ember-data/model";
import FieldInformation from "ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { FieldOptionsInterface } from "ember-field-components/services/field-information";
import { tagName } from "@ember-decorators/component";

@tagName("")
export default abstract class BaseField extends Component {
  @service store!: Store;
  @service fieldInformation!: FieldInformation;

  /**
   * The model you want to render a field for
   */
  model!: Model;

  /**
   * The fieldname (attribute) of the model you want to render a field for
   */
  field!: string;

  /**
   * This flag renders the Field inline. No Label will be added.
   */
  inline: boolean = false;

  /**
   * This flag marks the field as required, and renders a is-required class
   */
  required: boolean = false;

  /**
   * The class you want to give the label accompanying the field
   */
  labelClass: string = "control-label";

  /**
   * The CSS class you want to give to the wrapper element of the input-field component
   */
  class: string = "";

  /**
   * A hash containing possible options depending on the implementation
   */
  options: any = {};

  /**
   * Returns the dasherized name of the model class
   */
  @computed("model")
  get modelName(): string | undefined {
    return this.modelComputed
      ? this.fieldInformation.getModelName(this.modelComputed)
      : undefined;
  }

  /**
   * Returns the model class looked up from the ember-data store.
   */
  @computed("modelName")
  get modelClass(): any | undefined {
    return this.modelName
      ? this.fieldInformation.getModelClass(this.modelName)
      : undefined;
  }

  /**
   * When a nested field is porvided we use the nested model, and the nested field
   */
  @computed("model", "field")
  get modelComputed(): Model /* | ModelFragment */ {
    const splittedField = this.field.split(".");
    let model = this.model;

    if (splittedField.length > 1) {
      // nested value
      splittedField.pop(); // remove the last field path
      model = model.get(splittedField.join("."));
    }

    return model;
  }

  @computed("field")
  get fieldComputed(): string {
    const splittedField = this.field.split(".");

    if (splittedField.length > 1) {
      return splittedField.pop();
    } else {
      return this.field;
    }
  }

  /**
   * The type of Field is returned. This is the attribute type provided in the modelclass definition
   */
  @computed("modelName", "field")
  get type(): string | undefined {
    return this.modelName
      ? this.fieldInformation.getFieldType(this.modelName, this.fieldComputed)
      : undefined;
  }

  @computed("modelName", "field")
  get fieldOptions(): FieldOptionsInterface | undefined {
    return this.modelName
      ? this.fieldInformation.getFieldOptions(
          this.modelName,
          this.fieldComputed
        )
      : undefined;
  }

  @computed("fieldOptions")
  get isReadOnly(): boolean {
    return this.fieldOptions
      ? this.fieldInformation.getFieldIsReadOnly(this.fieldOptions)
      : false;
  }

  @computed("fieldOptions", "required")
  get isRequired(): boolean {
    return (
      this.required ||
      (this.fieldOptions
        ? this.fieldInformation.getFieldIsRequired(this.fieldOptions)
        : false)
    );
  }

  @computed("model.errors.[]", "field")
  get hasError(): boolean {
    const errors = this.modelComputed.get("errors");
    return errors.has(this.fieldComputed);
  }

  @computed("fieldOptions")
  get widgetName(): string | undefined {
    const fieldOptions = this.fieldOptions;

    return fieldOptions && fieldOptions.hasOwnProperty("widget")
      ? fieldOptions.widget
      : undefined;
  }
}
