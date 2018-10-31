import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';

export default Helper.extend({
  compute([name]){
    const owner = getOwner(this);
    const lookup = owner.lookup('component-lookup:main');

    if (!lookup.componentFor) {
      return !!lookup.lookupFactory(name);
    }

    return !!(lookup.componentFor(name, owner) || lookup.layoutFor(name, owner));
  }
});
