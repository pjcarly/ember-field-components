import ValidationModel from "@getflights/ember-attribute-validations/model/validation-model";
import MutableArray from "@ember/array/mutable";
import { attr, hasMany } from "@ember-data/model";

export default class CompanyModel extends ValidationModel {
  // @ts-ignore
  @attr("string", { validation: { required: true } })
  name!: string;

  // @ts-ignore
  @attr("string", { validation: { max: 10 } })
  vatNumber?: string;

  // @ts-ignore
  @attr("number", {
    precision: 2,
    decimals: 1,
    validation: { range: { from: 0, to: 5 } },
  })
  rating?: number;

  // @ts-ignore
  @attr("number", { precision: 2, decimals: 1 })
  score?: number;

  // @ts-ignore
  @attr("number", {
    precision: 2,
    decimals: 1,
    validation: { negative: true, number: true },
  })
  credit?: number;

  // @ts-ignore
  @attr("number", {
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
