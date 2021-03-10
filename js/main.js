import {
  createSimilarAdvertisements
} from './create-similar-advertisements.js';

import {
  getData
} from './api.js';

import {
  address,
  deactivateForm,
  activateForm,
  activateFilters,
  filterEvents,
  setFormSubmit
} from './form.js';

import {
  renderAdvertisementsOnMap,
  removeMarkers,
  mainPinMarker
} from './map.js';

import './images-preview.js'

const RERENDER_DELAY = 500;
const SIMILAR_ADVERTISEMENTS_QUANTITY = 10;

const renderAdvertisements = () => {
  getData((similarAdvertisements) => {
    const advrts = similarAdvertisements.slice(0, SIMILAR_ADVERTISEMENTS_QUANTITY);
    activateFilters();
    createSimilarAdvertisements(advrts);
    filterEvents(_.debounce(
      (valueType, valuePrice, valueRooms, valueGuests, valuesFeature) => createSimilarAdvertisements(advrts, valueType, valuePrice, valueRooms, valueGuests, valuesFeature),
      RERENDER_DELAY,
    ));
  });
}

renderAdvertisements();
setFormSubmit();

export {
  address,
  removeMarkers,
  renderAdvertisementsOnMap,
  deactivateForm,
  activateForm,
  mainPinMarker,
  renderAdvertisements
}
