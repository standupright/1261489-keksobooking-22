import {similarAdvertisements} from './data.js';

const cardTemplate = document.querySelector ('#card');

const similarListFragment = document.createDocumentFragment ();

similarAdvertisements.forEach (({author, offer}) => {
  const advertisement = cardTemplate.cloneNode (true).content;
  advertisement.querySelector ('.popup__title').textContent = offer.title;
  advertisement.querySelector ('.popup__text--address').textContent =
    offer.addres;
  advertisement.querySelector ('.popup__text--price').textContent = offer.price;

  switch (offer.type) {
    case 'flat':
      advertisement.querySelector ('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      advertisement.querySelector ('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      advertisement.querySelector ('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      advertisement.querySelector ('.popup__type').textContent = 'Дворец';
      break;
    default:
      break;
  }

  advertisement.querySelector ('.popup__text--capacity').textContent =
    offer.rooms + ' комнаты для ' + offer.guests + ' гостей';

  advertisement.querySelector ('.popup__text--time').textContent =
    'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

  // Создание списка дополнительных потребностей

  const popupFeatures = advertisement.querySelector ('.popup__features');

  while (popupFeatures.firstChild) {
    popupFeatures.removeChild (popupFeatures.firstChild);
  }

  // Функция для создания дочернего элемента li в списке с возвратом элемента li
  const createElementInList = (nameChild, nameParent) => {
    const element = document.createElement ('li');
    element.classList.add ('.popup__feature');
    element.classList.add ('.popup__feature--' + nameChild);
    nameParent.appendChild (element);
    return element;
  };

  offer.features.forEach (value => {
    switch (value) {
      case 'wifi':
        createElementInList ('wifi', popupFeatures).textContent = 'wifi';
        break;
      case 'dishwasher':
        createElementInList ('dishwasher', popupFeatures).textContent =
          'dishwasher';
        break;
      case 'parking':
        createElementInList ('parking', popupFeatures).textContent = 'parking';
        break;
      case 'washer':
        createElementInList ('washer', popupFeatures).textContent = 'washer';
        break;
      case 'elevator':
        createElementInList ('elevator', popupFeatures).textContent =
          'elevator';
        break;
      case 'conditioner':
        createElementInList ('conditioner', popupFeatures).textContent =
          'conditioner';
        break;
      default:
        break;
    }
  });

  advertisement.querySelector ('.popup__description').textContent =
    offer.description;
  advertisement.querySelector ('.popup__photos').textContent = offer.photos;
  advertisement.querySelector ('.popup__avatar').textContent = author.avatar;
  similarListFragment.appendChild (advertisement);

});

//отрисовка
const map = document.querySelector ('.map__canvas');
map.appendChild (similarListFragment);
