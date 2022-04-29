import Helper from "@ember/component/helper";
import { isBlank } from "@ember/utils";
import Model from "@ember-data/model";
import { inject as service } from "@ember/service";
import FieldInformationService from "../services/field-information";

export default class ModelSingularHelper extends Helper {
  @service fieldInformation!: FieldInformationService;

  compute([model]: [Model]): string {
    if (isBlank(model)) {
      return "";
    }

    // @ts-ignore
    const modelName = this.fieldInformation.getModelName(model);
    return this.fieldInformation.getTranslatedSingular(modelName);
  }
}
