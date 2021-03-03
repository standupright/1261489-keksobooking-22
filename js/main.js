import {
  renderSimilarAdvertisements,
  popups
} from './createSimilarAdvertisement.js';

import {
  getData
} from './api.js';

import {
  address,
  deactivateForm,
  activateForm,
  activateFilters,
  onFiltersEvents,
  setFormSubmit
} from './form.js';

import {
  renderAdvertisementsOnMap,
  mainPinMarker
} from './map.js';

const SIMILAR_ADVERTISEMENTS_QUANTITY = 10;

getData((similarAdvertisements) => {
  const advrts = similarAdvertisements.slice(0,SIMILAR_ADVERTISEMENTS_QUANTITY);
  activateFilters();
  renderSimilarAdvertisements(advrts);
  renderAdvertisementsOnMap(advrts);
  onFiltersEvents( () => {
    renderSimilarAdvertisements(advrts);
    renderAdvertisementsOnMap(advrts);
  })
}) 

setFormSubmit();

export {
  address,
  deactivateForm,
  activateForm,
  popups,
  mainPinMarker
}
