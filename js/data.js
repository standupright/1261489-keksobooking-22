import {getRandomCords} from './util.js';

const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];

const OFFER_TIMES = ['12:00', '13:00', '14:00'];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const quantityFeatures = 5;
const quantityPhotos = 3;

const createUserNumber = () => '0' + Math.round (getRandomCords (1, 8, 0));

// Создание массива строк случайной длины без повторения значений
const createRandomLengthArr = ([...arr], maxLength) =>
  Array.from (
    {
      length: Math.min (arr.length, (1 + Math.random () * maxLength) | 0),
    },
    () => arr.splice ((Math.random () * arr.length) | 0, 1)[0] );

const createAdvertisement = () => {
  return {
    author: {
      avatar: 'img/avatars/user' + createUserNumber () + '.png',
    },
    offer: {
      title: 'Предлагаем Вам посетить следующий отель ',
      addres: toString (location.x) + ', ' + toString (location.y),
      price: 100,
      type: OFFER_TYPES[0],
      rooms: 2,
      guests: 5,
      checkin: OFFER_TIMES[0],
      checkout: OFFER_TIMES[0],
      features: createRandomLengthArr (OFFER_FEATURES, quantityFeatures),
      description: 'Уютные и удобные номера ждут вас в нашем отеле!',
      photos: createRandomLengthArr (OFFER_PHOTOS, quantityPhotos),
    },
    location: {
      x: getRandomCords (35.65, 35.7, 5),
      y: getRandomCords (139.7, 139.8, 5),
    },
  };
};

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const similarAdvertisements = new Array (SIMILAR_ADVERTISEMENT_COUNT)
  .fill (null)
  .map (() => createAdvertisement ());

export {similarAdvertisements};
