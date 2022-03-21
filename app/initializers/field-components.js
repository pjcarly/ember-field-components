import { registerLibrary } from '@getflights/ember-field-components/version';

export function initialize(/* container, application */) {
  registerLibrary();
}

export default {
  name: 'field-components',
  initialize,
};
