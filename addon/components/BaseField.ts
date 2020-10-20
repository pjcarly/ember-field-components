import Component from "@glimmer/component";
import Store from "@ember-data/store";
import Model from "@ember-data/model";
import FieldInformation from "@getflights/ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import { FieldOptionsInterface } from "@getflights/ember-field-components/services/field-information";
import { tracked } from "@glimmer/tracking";
import { computed } from "@ember/object";

export interface Arguments {
  /**
   * The model you want to render a field for
   */
  model: Model;

  /**
   * The fieldname (attribute) of the model you want to render a field for
   */
  field: string;

  /**
   * This flag renders the Field inline. No Label will be added.
   */
  inline: boolean;

  /**
   * This flag marks the field as required, and renders a is-required class
   */
  required: boolean;

  /**
   * This flag marks the field as readonly, and renders a is-readonly class
   * and no input field
   */
  readonly: boolean;

  /**
   * The class you want to give the label accompanying the field
   */
  labelClass: string;

  /**
   * The CSS class you want to give to the wrapper element of the input-field component
   */
  class?: string;

  /**
   * A hash containing possible options depending on the implementation
   */
  options?: any;
}

export default abstract class BaseField<T extends Arguments> extends Component<
  T
> {
  @service store!: Store;
  @service fieldInformation!: FieldInformation;

  /**
   * Property that is toggled upon focus
   */
  @tracked focus: boolean = false;

  /**
   * Returns the dasherized name of the model class
   */
  get modelName(): string | undefined {
    return this.modelComputed
      ? this.fieldInformation.getModelName(this.modelComputed)
      : undefined;
  }

  /**
   * Returns the model class looked up from the ember-data store.
   */
  get modelClass(): any | undefined {
    return this.modelName
      ? this.fieldInformation.getModelClass(this.modelName)
      : undefined;
  }

  /**
   * When a nested field is provided we use the nested model, and the nested field
   */
  get modelComputed(): Model /* | ModelFragment */ {
    const splittedField = this.args.field.split(".");
    let model = this.args.model;

    if (splittedField.length > 1) {
      // nested value
      splittedField.pop(); // remove the last field path
      // @ts-ignore
      model = model.get(splittedField.join("."));
    }

    return model;
  }

  get fieldComputed(): string {
    const splittedField = this.args.field.split(".");

    if (splittedField.length > 1) {
      // @ts-ignore
      return splittedField.pop();
    } else {
      return this.args.field;
    }
  }

  /**
   * The type of Field is returned. This is the attribute type provided in the modelclass definition
   */
  get type(): string | undefined {
    return this.modelName
      ? this.fieldInformation.getFieldType(this.modelName, this.fieldComputed)
      : undefined;
  }

  @computed()
  get fieldOptions(): FieldOptionsInterface | undefined {
    return this.modelName
      ? this.fieldInformation.getFieldOptions(
          this.modelName,
          this.fieldComputed
        )
      : undefined;
  }

  get isReadOnly(): boolean {
    if (this.args.readonly) {
      return true;
    } else if (
      this.modelName &&
      this.fieldInformation.getFieldIsComputedProperty(
        this.modelName,
        this.args.field
      )
    ) {
      return true;
    } else if (this.fieldOptions) {
      return this.fieldInformation.getFieldIsReadOnly(this.fieldOptions);
    } else {
      return false;
    }
  }

  get isRequired(): boolean {
    return (
      this.args.required ||
      (this.fieldOptions
        ? this.fieldInformation.getFieldIsRequired(this.fieldOptions)
        : false)
    );
  }

  get hasError(): boolean {
    const errors = this.modelComputed.errors;
    return (
      errors
        // @ts-ignore
        .has(this.fieldComputed)
    );
  }

  @computed()
  get widgetName(): string | undefined {
    const fieldOptions = this.fieldOptions;

    return fieldOptions && fieldOptions.hasOwnProperty("widget")
      ? fieldOptions.widget
      : undefined;
  }
}
