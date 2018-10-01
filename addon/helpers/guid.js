import Helper from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';
import { isBlank } from '@ember/utils';

export default Helper.extend({
  compute([value]){
    if (isBlank(value)) {
      return null;
    }

    return guidFor(value);
  }
});
