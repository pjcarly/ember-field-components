import Helper from "@ember/component/helper";
import { isBlank } from "@ember/utils";
import { getOwner } from "@ember/application";

export default class RouteExistsHelper extends Helper {
  compute([route]: [string]): boolean {
    if (isBlank(route)) {
      return false;
    }

    return (<any>getOwner(this)).lookup(`route:${route}`) ? true : false;
  }
}
