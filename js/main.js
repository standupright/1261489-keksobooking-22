<<<<<<< HEAD
const getRandomCoords = (min, max, numberOfSigns) => {
  if (min < 0 || max < 0) {
    return 0;
  }

  if (numberOfSigns < 0 || numberOfSigns > 20) {
    numberOfSigns = 0;
  }

  let coords = (Math.random() * (max - min) + min).toFixed(numberOfSigns);

  if (min >= max) {
    coords = Math.random() * (min - max) + max;
  }
  return coords;
};
=======
import './data.js';
import './createSimilarAdvertisement.js';
import './form.js';
>>>>>>> 657ed96595259b37a1231872aea64625088cda02
