import OutputFieldComponent from "../output-field/component";
import SelectOption from "ember-field-components/interfaces/SelectOption";
import FieldInformationService from "ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { isArray } from "@ember/array";

export default class OutputFieldSelectComponent extends OutputFieldComponent {
  @service fieldInformation!: FieldInformationService;

  @computed("fieldOptions", "intl.locale")
  get selectOptions(): SelectOption[] {
    const fieldOptions = this.fieldOptions;
    const selectOptions: SelectOption[] = [];

    if (!fieldOptions) {
      return selectOptions;
    }

    if (
      !fieldOptions.hasOwnProperty("selectOptions") ||
      !isArray(fieldOptions.selectOptions)
    ) {
      return selectOptions;
    }

    for (const fieldSelectOption of fieldOptions.selectOptions) {
      const selectOption: SelectOption = {
        value: fieldSelectOption.value
      };

      selectOption.label = this.fieldInformation.getTranslatedSelectOptionLabel(
        // @ts-ignore
        this.modelName,
        this.field,
        fieldSelectOption.value
      );
      selectOptions.push(selectOption);
    }

    return selectOptions;
  }
}
