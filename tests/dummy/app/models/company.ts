import Model from "@ember-data/model";
import { validationModel } from "@getflights/ember-attribute-validations/decorators/validation-model";
import { field } from "@getflights/ember-field-components/model/attribute";
import MutableArray from "@ember/array/mutable";
import { hasMany } from "@ember-data/model";

@validationModel
export default class CompanyModel extends Model {
  @field("string", { validation: { required: true } })
  name!: string;

  @field("string", { validation: { max: 10 } })
  vatNumber?: string;

  @field("number", {
    precision: 2,
    decimals: 1,
    validation: { range: { from: 0, to: 5 } },
  })
  rating?: number;

  @field("number", { precision: 2, decimals: 1 })
  score?: number;

  @field("number", {
    precision: 2,
    decimals: 1,
    validation: { negative: true, number: true },
  })
  credit?: number;

  @field("number", {
    precision: 2,
    decimals: 1,
    validation: { positive: true, number: true },
  })
  debit?: number;

  @hasMany("contact")
  contacts!: MutableArray<CompanyModel>;
}

declare module "ember-data/types/registries/model" {
  export default interface ModelRegistry {
    company: CompanyModel;
  }
}
