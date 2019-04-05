import Helper from '@ember/component/helper';
import { isBlank } from '@ember/utils';
import { htmlSafe } from '@ember/template';

export default class NewlineToBrHelper extends Helper {
  compute([value]: [string|null]) {
    if (isBlank(value)) {
      return null;
    }

    return htmlSafe(value.replace(/\n/g, '<br>'));
  }
}
