import InputField, { InputFieldArguments } from "../input-field/component";
import SelectOption from "@getflights/ember-field-components/interfaces/SelectOption";
import { isArray } from "@ember/array";

export interface FieldSelectArguments extends InputFieldArguments {}

export default class InputFieldSelectComponent extends InputField<
  FieldSelectArguments
> {
  selectOptions?: SelectOption[];

  get dependentValue() {
    return (
      this.args.model
        // @ts-ignore
        .get(this.args.dependentValue)
    );
  }

  /**
   * Here we define a computed property for the "value", which checks whether the value is found in the
   * selectOptions, and if not, will set the field to NULL.
   * This will only be done for fields with a dependency.
   * And is just a clone of value if no dependency is defined
   */
  get computedValue(): any {
    if (this.dependentField) {
      let allowedValueFound = false;
      for (const selectOption of this.selectOptionsComputed) {
        if (selectOption.value === this.value) {
          allowedValueFound = true;
          break;
        }
      }

      if (!allowedValueFound) {
        this.setNewValue(null);
      } else {
        return this.value;
      }
    } else {
      return this.value;
    }
  }

  get selectOptionsComputed(): SelectOption[] {
    const fieldOptions = this.fieldOptions;
    const selectOptions: SelectOption[] = [];

    if (this.selectOptions) {
      return this.selectOptions;
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
        dependencies.has(this.dependentValue)
      ) {
        allowedValues = dependencies.get(this.dependentValue);
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
}
