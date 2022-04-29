import Helper from "@ember/component/helper";
import { isBlank } from "@ember/utils";
import Model from "@ember-data/model";
import { inject as service } from "@ember/service";
import FieldInformationService from "../services/field-information";

export default class ModelNameHelper extends Helper {
  @service fieldInformation!: FieldInformationService;

  compute([model]: [Model]): string {
    if (isBlank(model)) {
      return "";
    }

    // @ts-ignore
    return this.fieldInformation.getModelName(model);
  }
}
