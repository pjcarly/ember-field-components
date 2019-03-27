import { computedDecoratorWithParams } from '@ember-decorators/utils/computed';
import { setType } from '../classes/attribute';

/**
 * Field decorator for use with native classes
 */
export let field = computedDecoratorWithParams((_ : any, params: any) => setType.apply(this, params));
