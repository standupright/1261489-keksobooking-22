import {
  renderSimilarAdvertisements
} from './createSimilarAdvertisement.js';

import {
  getData
} from './api.js';


 const advertisements = getData((similarAdvertisements) => {
  renderSimilarAdvertisements(similarAdvertisements);
   console.log(renderSimilarAdvertisements(similarAdvertisements))
 });

 console.log(advertisements)

// import {initiateMap} from './map.js';
// import {address, setFormSubmit} from './form.js';


//export {initiateMap,address,setFormSubmit,advertisements}
