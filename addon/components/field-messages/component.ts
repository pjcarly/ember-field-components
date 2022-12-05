import Component from "@glimmer/component";
import Model from "@ember-data/model";
import DS from "ember-data";
import { computed, get } from "@ember/object";

interface Arguments {
  model: Model;
  field: string;
}

export default class FieldMessagesComponent extends Component<Arguments> {

  @computed("args.model.errors.[]", "args.field")
  get errors() {
    const errors = get(this.args.model, 'errors') as DS.Errors;
    return errors.errorsFor(this.args.field);
  }
}
