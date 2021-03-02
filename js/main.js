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
  setFormSubmit
} from './form.js';

import {
  renderAdvertisementsOnMap,
  mainPinMarker
} from './map.js';



const SIMILAR_ADVERTISEMENTS_QUANTITY = 10;

getData((similarAdvertisements) => {
  renderSimilarAdvertisements(similarAdvertisements.slice(0,SIMILAR_ADVERTISEMENTS_QUANTITY));
  renderAdvertisementsOnMap(similarAdvertisements.slice(0,SIMILAR_ADVERTISEMENTS_QUANTITY));
});

setFormSubmit();

export {
  address,
  deactivateForm,
  activateForm,
  popups,
  mainPinMarker
}
