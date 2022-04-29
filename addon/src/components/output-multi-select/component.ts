import BaseOutput, { Arguments } from "../BaseOutput";
import { A, isArray } from "@ember/array";
import SelectOption from "../../interfaces/SelectOption";
import MutableArray from "@ember/array/mutable";

export interface MultiSelectArguments extends Arguments {
  value?: string[];
  selectOptions: SelectOption[];
}

export default class OutputMultiSelectComponent extends BaseOutput<
  MultiSelectArguments
> {
  type = "multi-select";

  get selectOptionComputed(): MutableArray<SelectOption> {
    return A(this.args.selectOptions);
  }

  get selectedLabels(): string[] {
    const selectedLabels: string[] = [];

    if (isArray(this.args.value)) {
      for (const selectedValue of this.args.value) {
        const selectedOption = this.selectOptionComputed.findBy(
          "value",
          selectedValue
        );

        if (selectedOption) {
          selectedLabels.push(selectedOption.label ?? selectedOption.value);
        } else {
          selectedLabels.push(selectedValue);
        }
      }
    }

    return selectedLabels;
  }
}
