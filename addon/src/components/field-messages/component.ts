import Component from "@glimmer/component";
import Model from "@ember-data/model";
import DS from "ember-data";

export interface Arguments {
  model: Model;
  field: string;
}

export default class FieldMessagesComponent extends Component<Arguments> {
  get errors() {
    const errors = <DS.Errors>(<unknown>this.args.model.errors);
    return errors.errorsFor(this.args.field);
  }
}
