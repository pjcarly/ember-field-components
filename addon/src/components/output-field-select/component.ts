import OutputFieldComponent, {
  OutputFieldArguments,
} from "../output-field/component";
import SelectOption from "../../interfaces/SelectOption";
import FieldInformationService from "../../services/field-information";
import { inject as service } from "@ember/service";
import { isArray } from "@ember/array";
import type IntlService from 'ember-intl/services/intl';

export default class OutputFieldSelectComponent extends OutputFieldComponent<
  OutputFieldArguments
> {
  @service declare fieldInformation: FieldInformationService;
  @service intl!: IntlService;

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
        value: fieldSelectOption.value,
      };

      selectOption.label = this.fieldInformation.getTranslatedSelectOptionLabel(
        // @ts-ignore
        this.modelName,
        this.args.field,
        fieldSelectOption.value
      );
      selectOptions.push(selectOption);
    }

    return selectOptions;
  }

  get noneLabel(): string | undefined {
    if (!this.modelName) {
      return;
    }

    if (
      this.intl.exists(
        `ember-field-components.${this.modelName}.selectNone.${this.args.field}`
      )
    ) {
      return this.intl.t(
        `ember-field-components.${this.modelName}.selectNone.${this.args.field}`
      );
    }

    return;
  }
}
