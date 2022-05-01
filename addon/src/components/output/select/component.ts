import BaseOutput, { Arguments } from "../../BaseOutput";
import SelectOption from "../../../interfaces/SelectOption";
import MutableArray from "@ember/array/mutable";
import { A } from "@ember/array";

export interface MultiSelectArguments extends Arguments {
  value?: string;
  selectOptions: SelectOption[];
  noneLabel?: string;
}

export default class OutputSelectComponent extends BaseOutput<
  MultiSelectArguments
> {
  type = "select";

  get selectOptionComputed(): MutableArray<SelectOption> {
    return A(this.args.selectOptions);
  }

  get selectedLabel(): string | undefined {
    if (this.args.value) {
      const selectOption = this.selectOptionComputed.findBy(
        "value",
        this.args.value
      );

      if (selectOption) {
        return selectOption.label ?? selectOption.value;
      }

      return this.args.value;
    } else if (this.args.noneLabel) {
      return this.args.noneLabel;
    }

    return;
  }
}
