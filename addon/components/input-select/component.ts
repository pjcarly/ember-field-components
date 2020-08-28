import BaseInput from "../BaseInput";
import SelectOption from "@getflights/ember-field-components/interfaces/SelectOption";
import SelectOptionGroup from "@getflights/ember-field-components/interfaces/SelectOptionGroup";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";
import { inject as service } from "@ember/service";

export default class InputSelectComponent extends BaseInput {
  @service intl!: any;

  type = "select";
  required: boolean = false;
  noneLabel: string = "";
  selectOptions: SelectOption[] | SelectOptionGroup[] = [];

  @computed("computedValue", "required")
  get showNone(): boolean {
    return isBlank(this.computedValue) || this.required === false;
  }

  @computed("computedValue", "required")
  get noneDisabled(): boolean {
    return isBlank(this.computedValue) && this.required;
  }

  @computed("computedValue", "required")
  get noneSelected(): boolean {
    return isBlank(this.computedValue) && this.required;
  }

  @computed("noneLabel", "intl.local")
  get noneLabelComputed(): string {
    return isBlank(this.noneLabel)
      ? this.intl.t("ember-field-components.label.select_none")
      : this.noneLabel;
  }

  @computed("selectOptions.[]", "value")
  get selectOptionsContainsValue(): boolean {
    let returnValue = false;

    for (const selectOption of this.selectOptions) {
      // @ts-ignore
      if (selectOption.selectOptions) {
        // @ts-ignore
        for (const nestedSelectOption of selectOption.selectOptions) {
          if (nestedSelectOption.value == this.value) {
            returnValue = true;
            break;
          }
        }
      }

      // @ts-ignore
      if (selectOption.value == this.value) {
        returnValue = true;
      }

      if (returnValue) {
        break;
      }
    }

    return returnValue;
  }
}
