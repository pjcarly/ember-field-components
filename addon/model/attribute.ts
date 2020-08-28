import { setType } from "../classes/attribute";
// @ts-ignore
import { computedDecoratorWithParams } from "@getflights/ember-field-components/-private/computed";

/**
 * Field decorator for use with native classes
 */
export let field = computedDecoratorWithParams((_: any, params: any) =>
  // @ts-ignore
  setType.apply(this, [_, params])
);
