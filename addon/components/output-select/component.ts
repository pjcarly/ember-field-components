import BaseOutput from "../BaseOutput";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";
import { inject as service } from "@ember/service";
import SelectOption from "@getflights/ember-field-components/interfaces/SelectOption";
import MutableArray from "@ember/array/mutable";
import { A } from "@ember/array";

export default class OutputSelectComponent extends BaseOutput {
  @service intl!: any;

  type = "select";
  selectOptions!: SelectOption[];

  @computed("selectOptions")
  get selectOptionComputed(): MutableArray<SelectOption> {
    return A(this.selectOptions);
  }

  @computed("value")
  get selectedLabel(): string | undefined {
    if (!isBlank(this.value)) {
      const selectedOption = this.selectOptionComputed.findBy(
        "value",
        this.value
      );

      if (selectedOption) {
        return selectedOption.label;
      }
    }

    return;
  }
}
