import { setType } from "../classes/attribute";
import { computedDecoratorWithParams } from "ember-field-components/-private/computed";

/**
 * Field decorator for use with native classes
 */
export let field = computedDecoratorWithParams((_: any, params: any) =>
  // @ts-ignore
  setType.apply(this, [_, params])
);
