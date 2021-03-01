import {
  renderSimilarAdvertisements,popups
} from './createSimilarAdvertisement.js';

import {
  getData
} from './api.js';

import {initiateMap,renderAdvertisementsOnMap,mainPinMarker} from './map.js';
import {address, setFormSubmit} from './form.js';

getData((similarAdvertisements) => {
  renderSimilarAdvertisements(similarAdvertisements);
  renderAdvertisementsOnMap(similarAdvertisements);
});

setFormSubmit();

export {initiateMap,address,popups,mainPinMarker}
