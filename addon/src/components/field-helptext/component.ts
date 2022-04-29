import Component from "@glimmer/component";
import FieldInformation from "../../services/field-information";
import Model from "@ember-data/model";
import { inject as service } from "@ember/service";
import type IntlService from 'ember-intl/services/intl';

interface Arguments {
  model: Model;
  field: string;
  modelName?: string;
  helptext?: string;
}

export default class FieldHelptextComponent extends Component<Arguments> {
  @service intl!: IntlService;
  @service fieldInformation!: FieldInformation;

  get helptextComputed() {
    if (this.args.helptext) {
      return this.args.helptext;
    }

    const modelName = this.args.modelName
      ? this.args.modelName
      : this.fieldInformation.getModelName(this.args.model);

    return this.fieldInformation.getTranslatedFieldHelptext(
      modelName,
      this.args.field
    );
  }
}
