import { setType } from "../classes/attribute";

export function field(_type: string, _options?: any) {
  // @ts-ignore
  return setType.apply(this, [_, params]);
}
