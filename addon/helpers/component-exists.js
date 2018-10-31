import Helper from '@ember/component/helper';
import { isBlank } from '@ember/utils';
import { getOwner } from '@ember/application';

export default Helper.extend({
  compute([name]){
    return !isBlank(getOwner(this).lookup(`component:${name}`));
  }
});
