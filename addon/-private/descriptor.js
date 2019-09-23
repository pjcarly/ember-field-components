import Ember from 'ember';
import { HAS_NATIVE_COMPUTED_GETTERS, gte } from 'ember-compatibility-helpers';
import { assert } from '@ember/debug';

export function isComputedDescriptor(possibleDesc) {
    return possibleDesc !== null && (typeof possibleDesc === 'object' || typeof possibleDesc === 'function') && possibleDesc.isDescriptor;
}

export function computedDescriptorFor(obj, keyName) {
    assert('Cannot call `descriptorFor` on null', obj !== null);
    assert('Cannot call `descriptorFor` on undefined', obj !== undefined);
    assert(`Cannot call \`descriptorFor\` on ${typeof obj}`, typeof obj === 'object' || typeof obj === 'function');

    if (HAS_NATIVE_COMPUTED_GETTERS) {
        let meta = Ember.meta(obj);

        if (meta !== undefined && typeof meta._descriptors === 'object') {
            // TODO: Just return the standard descriptor
            if (gte('3.8.0')) {
                return meta._descriptors.get(keyName);
            } else {
                return meta._descriptors[keyName];
            }
        }
    } else if (Object.hasOwnProperty.call(obj, keyName)) {
        let { value: possibleDesc } = Object.getOwnPropertyDescriptor(obj, keyName);

        return isComputedDescriptor(possibleDesc) ? possibleDesc : undefined;
    }
}