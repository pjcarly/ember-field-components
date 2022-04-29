import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';
import ApplicationInstance from "@ember/application/instance";

export default class ComponentExistsHelper extends Helper {
  compute([name]: [string]) {
    const owner = <ApplicationInstance>getOwner(this);
    const lookup = <any>owner.lookup('component-lookup:main');

    if (!lookup.componentFor) {
      return !!lookup.lookupFactory(name);
    }

    return !!(lookup.componentFor(name, owner) || lookup.layoutFor(name, owner));
  }
};
