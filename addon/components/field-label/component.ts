import Component from "@glimmer/component";
import Model from "@ember-data/model";
import FieldInformation from "@getflights/ember-field-components/services/field-information";
import { inject as service } from "@ember/service";
import type IntlService from 'ember-intl/services/intl';

interface Arguments {
  label?: string;
  modelName?: string;
  field: string;
  model: Model;
  inline?: boolean;
}

export default class LabelComponent extends Component<Arguments> {
  @service intl!: IntlService;
  @service fieldInformation!: FieldInformation;

  get labelComputed(): string {
    if (this.args.label) {
      return this.args.label;
    }

    const modelName = this.args.modelName
      ? this.args.modelName
      : this.fieldInformation.getModelName(this.args.model);
    return this.fieldInformation.getTranslatedFieldlabel(
      modelName,
      this.args.field
    );
  }
}
