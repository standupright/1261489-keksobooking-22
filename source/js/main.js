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
  getFiltersValues,
  setFormSubmit
} from './form.js';

import {
  renderAdvertisementsOnMap,
  removeMarkers,
  mainPinMarker
} from './map.js';

import './images-preview.js'

const RERENDER_DELAY = 500;

const renderAdvertisements = () => {
  getData((similarAdvertisements) => {
    activateFilters();
    _.debounce(
      createSimilarAdvertisements(similarAdvertisements), RERENDER_DELAY)
    getFiltersValues(_.debounce(
      (valueType, valuePrice, valueRooms, valueGuests, valuesFeature) => 
        createSimilarAdvertisements(similarAdvertisements, valueType, valuePrice, valueRooms, valueGuests, valuesFeature),
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
