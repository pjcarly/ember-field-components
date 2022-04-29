import { helper } from "@ember/component/helper";

export function equal(params: any) {
  return params[0] == params[1];
}

export default helper(equal);
