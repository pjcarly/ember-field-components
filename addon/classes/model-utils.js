import Ember from 'ember';

import { pluralize } from 'ember-inflector';
import { isBlank } from '@ember/utils';
import { get } from '@ember/object';
import { assert } from '@ember/debug';
import { capitalize } from '@ember/string';

export function getModelName(model){
  return model.constructor.modelName;
}

export function modelTypeIsCacheable(modelType){
  return modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('cacheable') && modelType.settings.cacheable;
}

export function modelTypeWasLoaded(modelType){
  modelType.settings.loadedFromCache = true;
}

export function modelTypeHasBeenLoadedFromCache(modelType){
  return modelType.settings.hasOwnProperty('loadedFromCache') && modelType.settings.loadedFromCache;
}

export function getModelType(modelTypeName, store){
  return store.modelFor(modelTypeName);
}

export function hasRoute(modelType){
  return !(modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('noRoute') && modelType.settings.noRoute);
}

export function getParentModelTypeName(model, field){
  const relationships = get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'belongsTo') {
    const relationship = relationships.get(field);
    assert(`Relationship ${field} for ${model.constructor} is a polymorphic relationship, use getParentModelTypeNames function instead`, !relationship.options.polymorphic);
    return relationship.type;
  }
}

export function getParentModelTypeNames(model, field){
  const relationships = get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'belongsTo') {
    const relationship = relationships.get(field);
    assert(`Relationship ${field} for ${getModelName(model)} is not polymorphic relationship, use getParentModelTypeName function instead`, relationship.options.polymorphic);
    assert(`Relationship ${field} for ${getModelName(model)} should have the key allowedModelTypes defined which should return an array with string values`, !isBlank(relationship.options.allowedModelTypes));

    const allowedModelTypeNames = relationship.options.allowedModelTypes;
    return allowedModelTypeNames;
  }
}

export function getChildModelTypeName(model, field){
  const relationships = get(model.constructor, 'relationshipsByName');

  if (relationships.has(field) && relationships.get(field).kind === 'hasMany') {
    const relationship = relationships.get(field);
    return relationship.type;
  }
}

export function getRelationshipInverse(model, field){
  const relationships = get(model.constructor, 'relationshipsByName');

  if (relationships.has(field)) {
    const relationship = relationships.get(field);
    assert(`No explicit inverse relationship defined for ${field} on ${getModelName(model)}`, !isBlank(relationship.options.inverse));

    return relationship.options.inverse;
  }
}

export function getParentModelType(model, field, store){
  const modelTypeName = getParentModelTypeName(model, field);
  if(!isBlank(modelTypeName)){
    return getModelType(modelTypeName, store);
  }
}

export function getDefaultIncludes(modelType){
  if(!isBlank(modelType)){
    if(modelType.settings.defaultIncludes){
      return modelType.settings.defaultIncludes;
    } else {
      return [];
    }
  }
}

export function getModelListView(modelType, name) {
  if(!isBlank(modelType)){
    if(modelType.settings.listViews){
      if(isBlank(name)){
        return modelType.settings.listViews.default;
      } else {
        return modelType.settings.listViews[name];
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
}

export function getPlural(modelType) {
  if(!isBlank(modelType)){
    if (modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('plural') && !isBlank(modelType.settings.plural)) {
      return modelType.settings.plural;
    } else {
      return capitalize(pluralize(modelType.modelName));
    }
  } else {
    return null;
  }
}

export function getLabel(modelType, field){
  if (!isBlank(modelType) && modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('labels') && modelType.settings.labels[field]) {
    return modelType.settings.labels[field];
  } else {
    return capitalize(field);
  }
}

export function getHelptext(modelType, field){
  if (!isBlank(modelType) && modelType.hasOwnProperty('settings') && modelType.settings.hasOwnProperty('helptexts') && modelType.settings.helptexts[field]) {
    return modelType.settings.helptexts[field];
  }
}

export function hasWidget(fieldAttributeOptions, widgetName) {
  return !isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('widget') && fieldAttributeOptions.widget === widgetName;
}

export function getWidgetOptions(fieldAttributeOptions) {
  if(!isBlank(fieldAttributeOptions) && fieldAttributeOptions.hasOwnProperty('widgetOptions')){
    return fieldAttributeOptions.widgetOptions;
  } else {
    return null;
  }
}
