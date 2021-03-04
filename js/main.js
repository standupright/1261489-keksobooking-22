import {
  createSimilarAdvertisements
} from './createSimilarAdvertisement.js';

import {
  getData
} from './api.js';

import {
  address,
  deactivateForm,
  activateForm,
  activateFilters,
  // hosingTypeEvent,
  // housingPriceEvent,
  // housingRoomsEvent,
  // housingGuestsEvent,
  filterEvetns,
  setFormSubmit
} from './form.js';

import {
  renderAdvertisementsOnMap,
  removeMarkers,
  mainPinMarker
} from './map.js';

const SIMILAR_ADVERTISEMENTS_QUANTITY = 10;

getData((similarAdvertisements) => {
  const advrts = similarAdvertisements.slice(0,SIMILAR_ADVERTISEMENTS_QUANTITY);
  activateFilters();
  createSimilarAdvertisements(advrts);
  filterEvetns( (value) => createSimilarAdvertisements(advrts,value) );
  // hosingTypeEvent( (value) => {
  //   createSimilarAdvertisements(advrts,value);
  // })
  // housingPriceEvent( (value) => {
  //   createSimilarAdvertisements(advrts,value);
  // })
  // housingRoomsEvent( (value) => {
  //   createSimilarAdvertisements(advrts,value);
  // })
  // housingGuestsEvent( (value) => {
  //   createSimilarAdvertisements(advrts,value);
  // })
}) 

setFormSubmit();

export {
  address,
  removeMarkers,
  renderAdvertisementsOnMap,
  deactivateForm,
  activateForm,
  mainPinMarker
}
