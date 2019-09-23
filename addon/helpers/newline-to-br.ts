import Helper from "@ember/component/helper";
import { isBlank } from "@ember/utils";
//@ts-ignore
import { htmlSafe } from "@ember/template";

export default class NewlineToBrHelper extends Helper {
  compute([value]: [string | null]) {
    if (isBlank(value)) {
      return null;
    }

    //@ts-ignore
    return htmlSafe(value.replace(/\n/g, "<br>"));
  }
}
