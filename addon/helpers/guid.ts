import Helper from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';
import { isBlank } from '@ember/utils';

export default class GuidHelper extends Helper {
  compute([value] : [any]){
    if (isBlank(value)) {
      return null;
    }

    return guidFor(value);
  }
}
