import Component from "@ember/component";
import Model from "@ember-data/model";
import FieldInformation from "@getflights/ember-field-components/services/field-information";
import { computed } from "@ember/object";
import { isBlank } from "@ember/utils";
import { inject as service } from "@ember/service";

export default class LabelComponent extends Component {
  @service intl!: any;
  @service fieldInformation!: FieldInformation;

  tagName = "";

  label: string = "";
  modelName: string = "";
  field!: string;
  model!: Model;
  inline: boolean = false;

  @computed("model", "field", "label", "modelName", "intl.locale")
  get labelComputed() {
    if (!isBlank(this.label)) {
      return this.label;
    }

    const modelName = isBlank(this.modelName)
      ? this.fieldInformation.getModelName(this.model)
      : this.modelName;
    return this.fieldInformation.getTranslatedFieldlabel(modelName, this.field);
  }
}
