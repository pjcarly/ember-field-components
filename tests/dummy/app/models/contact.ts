import Model from "ember-data/model";
import { validationModel } from "ember-attribute-validations/decorators/validation-model";
import { field } from "ember-field-components/model/attribute";

@validationModel
export default class ContactModel extends Model {
  @field("string", { validation: { in: { values: ["MR", "MS"] } } })
  salutation!: string;

  @field("string", {
    validation: { required: true, range: { from: 2, to: 20 } }
  })
  firstName!: string;

  @field("string", { validation: { required: true } })
  lastName!: string;

  @field("string", { validation: { email: true } })
  email?: string;

  @field("number", {
    precision: 2,
    decimals: 1,
    validation: {
      wholenumber: true,
      max: 150,
      min: 0
    }
  })
  age?: number;

  @field("date", {
    validation: {
      date: true,
      after: new Date("2000-01-01"),
      before() {
        return new Date();
      }
    }
  })
  birthdate?: Date;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    contact: ContactModel;
  }
}
