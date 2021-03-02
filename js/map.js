import {
  popups,
  address,
  deactivateForm,
  activateForm
} from './main.js';

deactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.681700,
    lng: 139.753882,
  }, 9);

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

const START_CORDS = {
  x: 35.68170,
  y: 139.75388,
};

const mainPinMarker = L.marker({
  lat: START_CORDS.x,
  lng: START_CORDS.y,
}, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

const setAddress = (markerName) => {
  let pinCords = markerName.getLatLng();
  address.value = (pinCords.lat).toFixed(5) + ', ' + (pinCords.lng).toFixed(5);
}

mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target);
});

let counter = 0;
let choosedAdvertisement;
const chooseAdvertisement = (renderedAdvertisements) => {
  choosedAdvertisement = renderedAdvertisements[counter];
  counter++;
  if (counter > renderedAdvertisements.length) {
    counter = 0;
  }

  return choosedAdvertisement;
}

const renderAdvertisementsOnMap = (similarAdvertisements) => {
  similarAdvertisements.forEach(({
    location
  }) => {
    const regularIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const regularPinMarker = L.marker({
      lat: location.lat,
      lng: location.lng,
    }, {
      icon: regularIcon,
    }, );

    regularPinMarker
      .addTo(map)
      .bindPopup(chooseAdvertisement(popups), {
        keepInView: true,
      }, )
  });
}

export {
  renderAdvertisementsOnMap,
  mainPinMarker
}
