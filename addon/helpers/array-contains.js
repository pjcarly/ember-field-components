import Helper from '@ember/component/helper';
import { isArray } from '@ember/array';
import { isBlank } from '@ember/utils';

export default Helper.extend({
  compute([array, value]){
    if (isBlank(value) || !isArray(array)) {
      return false;
    }

    return array.indexOf(value) !== -1;
  }
});
