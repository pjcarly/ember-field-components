import InputField, { InputFieldArguments } from "../../input-field/component";
import SelectOption from "../../../interfaces/SelectOption";
import { isArray } from "@ember/array";
import { action } from "@ember/object";
import Model from "@ember-data/model";

export interface InputFieldSelectArguments
  extends InputFieldArguments<string | string[]> { }

export default class InputFieldSelectComponent extends InputField<
  InputFieldSelectArguments,
  string | string[]
> {
  selectOptions?: SelectOption[];

  protected dependencyOf = new Map<String, Map<string, string[]>>();

  constructor(owner: any, args: InputFieldSelectArguments) {
    super(owner, args);
    this.fillDependencies();
  }

  /**
   * Here we build a map of other select fields who are dependent on the value of this field
   * If the value of this field changes, and it is not allowed in the dependent fields,
   * we must clear the value of the dependent fiels as well
   */
  protected fillDependencies(): void {
    const modelClass = <Model>this.modelClass;

    // @ts-ignore
    modelClass.eachAttribute((field: string, meta: any) => {
      if (
        meta.type === "select" &&
        meta.options?.dependentField &&
        meta.options?.selectOptionDependencies
      ) {
        if (meta.options.dependentField === this.args.field) {
          this.dependencyOf.set(field, meta.options.selectOptionDependencies);
        }
      }
    });
  }

  get dependentValue() {
    return (
      this.args.model
        // @ts-ignore
        .get(this.dependentField)
    );
  }

  get selectOptionsComputed(): SelectOption[] {
    const fieldOptions = this.fieldOptions;
    const selectOptions: SelectOption[] = [];

    if (this.selectOptions) {
      return this.selectOptions;
    } else if (this.args.options?.selectOptions) {
      return this.args.options.selectOptions;
    } else if (
      fieldOptions &&
      fieldOptions.hasOwnProperty("selectOptions") &&
      isArray(fieldOptions.selectOptions)
    ) {
      return this.getAllowedSelectOptions(fieldOptions.selectOptions);
    }

    return selectOptions;
  }

  /**
   * Returns the allowed selectOptions based if a dependency is present or not
   * @param selectOptions The selectOptions you want to filter
   */
  getAllowedSelectOptions(selectOptions: SelectOption[]): SelectOption[] {
    if (!this.modelName) {
      return [];
    }

    const returnValues: SelectOption[] = [];

    let allowedValues: string[] | undefined = undefined;
    if (this.dependentField) {
      const dependencies = this.selectOptionDependencies;

      if (
        dependencies &&
        this.dependentValue &&
        dependencies
          // @ts-ignore
          .has(this.dependentValue)
      ) {
        allowedValues = dependencies
          // @ts-ignore
          .get(this.dependentValue);
      }
    }

    for (const fieldSelectOption of selectOptions) {
      if (allowedValues && !allowedValues.includes(fieldSelectOption.value)) {
        continue;
      }

      const selectOption: SelectOption = {
        value: fieldSelectOption.value,
      };

      selectOption.label = this.fieldInformation.getTranslatedSelectOptionLabel(
        this.modelName,
        this.args.field,
        fieldSelectOption.value
      );
      returnValues.push(selectOption);
    }

    return returnValues;
  }

  get selectOptionDependencies(): Map<string, string[]> | undefined {
    const fieldOptions = this.fieldOptions;

    if (
      !fieldOptions ||
      !fieldOptions.hasOwnProperty("selectOptionDependencies")
    ) {
      return undefined;
    }

    return fieldOptions.selectOptionDependencies;
  }

  get dependentField(): string | undefined {
    const fieldOptions = this.fieldOptions;

    if (!fieldOptions || !fieldOptions.hasOwnProperty("dependentField")) {
      return undefined;
    }

    return fieldOptions.dependentField;
  }

  get noneLabel(): string {
    if (!this.modelName) {
      return "None";
    }

    return this.fieldInformation.getTranslatedSelectNoneLabel(
      this.modelName,
      this.args.field
    );
  }

  @action
  setSelectValue(value?: any) {
    // First we set the value on the field itself
    this.setNewValue(value);

    // Next we check for possible not allowed dependencies which we need to clear
    // in case the depenent value is no longer allowed
    this.dependencyOf.forEach((dependencies, field) => {
      if (dependencies.has(value)) {
        const dependentValue: any = this.args.model
          // @ts-ignore
          .get(field);

        if (dependencies.get(value)?.indexOf(dependentValue) !== -1) {
          // The current value exists in the allowed mapping, nothing needs to happen
        } else {
          this.args.model
            // @ts-ignore
            .set(field, undefined);
        }
      } else {
        // The value does not exists in the allowed mapping, we clear the dependency
        this.args.model
          // @ts-ignore
          .set(field, undefined);
      }
    });
  }
}
