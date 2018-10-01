import Ember from 'ember';

import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  userAgent: computed(function(){
    return $.ua;
  })
});
