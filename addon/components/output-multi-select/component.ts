import OutputSelectComponent from "../output-select/component";
import { computed } from "@ember-decorators/object";
import { isArray } from "@ember/array";
import { isBlank } from "@ember/utils";

export default class OutputMultiSelectComponent extends OutputSelectComponent {
  @computed('value')
  get selectedLabels() : string | undefined {
    const selectedValues = <string[]> this.value;
    const selectedLabels : string[] = [];

    if(isArray(selectedValues)) {
      for(const selectedValue of selectedValues) {
        const selectedOption = this.selectOptions.findBy('value', selectedValue);

        if(!isBlank(selectedOption)) {
          selectedLabels.push(selectedOption.label);
        }
      }

      return selectedLabels.join(', ');
    }

    return;
  }
}
