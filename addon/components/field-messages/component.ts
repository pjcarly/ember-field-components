import Component from "@glimmer/component";
import Model from "@ember-data/model";

interface Arguments {
  model: Model;
  field: string;
}

export default class FieldMessagesComponent extends Component<Arguments> {
  get errors() {
    const errors = this.args.model.errors;
    return (
      errors
        // @ts-ignore
        .errorsFor(this.args.field)
    );
  }
}
