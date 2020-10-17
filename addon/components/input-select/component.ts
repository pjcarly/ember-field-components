import BaseInput, { Arguments } from "../BaseInput";
import SelectOption from "@getflights/ember-field-components/interfaces/SelectOption";
import SelectOptionGroup from "@getflights/ember-field-components/interfaces/SelectOptionGroup";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export interface SelectArguments extends Arguments {
  value: string;
  required?: boolean;
  noneLabel?: string;
  selectOptions?: SelectOption[] | SelectOptionGroup[];
}

export default class InputSelectComponent<
  T extends SelectArguments
> extends BaseInput<T> {
  @service intl!: any;

  type = "select";

  get showNone(): boolean {
    return this.args.value ? true : false || this.args.required === false;
  }

  get noneDisabled(): boolean {
    return this.args.value ? false : true || this.args.required === true;
  }

  get noneSelected(): boolean {
    return this.args.value ? false : true || this.args.required === true;
  }

  get noneLabelComputed(): string {
    return this.args.noneLabel
      ? this.args.noneLabel
      : this.intl.t("ember-field-components.label.select_none");
  }

  get selectOptionsContainsValue(): boolean {
    let returnValue = false;

    if (this.args.selectOptions) {
      for (const selectOption of this.args.selectOptions) {
        // @ts-ignore
        if (selectOption.selectOptions) {
          // @ts-ignore
          for (const nestedSelectOption of selectOption.selectOptions) {
            if (nestedSelectOption.value == this.args.value) {
              returnValue = true;
              break;
            }
          }
        }

        // @ts-ignore
        if (selectOption.value == this.args.value) {
          returnValue = true;
        }

        if (returnValue) {
          break;
        }
      }
    }

    return returnValue;
  }

  @action
  selectValueChanged({ target }: { target: HTMLSelectElement }) {
    this.valueChanged(target.value);
  }
}
