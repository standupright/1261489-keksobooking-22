import {similarAdvertisements} from './data.js';

import {createSimilarAdvertisement} from './createSimilarAdvertisement.js';

let initiateMap = false;
const map = L.map('map-canvas')
  .on('load', () => {
    initiateMap = true;
  })
  .setView({
    lat: 35.681700,
    lng: 139.753882,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({
  lat: 35.681700,
  lng: 139.753882,
}, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

let cords = {
  x: 35.68170,
  y: 139.75388,
};

mainPinMarker.on('moveend', (evt) => {
  let newCords = evt.target.getLatLng();
  cords.x = (newCords.lat).toFixed(5);
  cords.y = (newCords.lng).toFixed(5);

});

similarAdvertisements.forEach(({location}) => {
  const regularIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const regularPinMarker = L.marker({
    lat: location.x,
    lng: location.y,
  }, {
    icon: regularIcon,
  }, 
  );
  
  regularPinMarker
    .addTo(map)
    .bindPopup(createSimilarAdvertisement(), {
      keepInView: true,
    }, 
    )
});


export {
  initiateMap,
  cords
}
