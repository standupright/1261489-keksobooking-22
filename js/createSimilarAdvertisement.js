import {renderAdvertisementsOnMap,removeMarkers} from './main.js'

const cardTemplate = document.querySelector('#card');

// Сортировка по типу жилья
const sortByType = (advertisementsElement, newAdvrtsArray, value) => {
  const type = advertisementsElement.offer.type;
  if (value === 'any') {
    newAdvrtsArray.push(advertisementsElement);
  }

  if (value === type) {
    newAdvrtsArray.push(advertisementsElement);
  }

}

// Сортировка по цене
const sortByPrice = (advertisementsElement, newAdvrtsArray, value) => {
  const price = advertisementsElement.offer.price;
  switch (value) {
    case 'middle':
      if (price >= 10000 && price < 50000) {
        newAdvrtsArray.push(advertisementsElement);
      }
      break;
    case 'low':
      if (price <= 10000) {
        newAdvrtsArray.push(advertisementsElement);
      }
      break;
    case 'high':
      if (price >= 50000) {
        newAdvrtsArray.push(advertisementsElement);
      }
      break;
    default:
      break;
  }

}

// Сортировка по числу комнат
const sortByRooms = (advertisementsElement, newAdvrtsArray, value) => {
  const rooms = advertisementsElement.offer.rooms;
  switch (value) {
    case '1':
      if (rooms === 1) {
        newAdvrtsArray.push(advertisementsElement);
      }
      break;
    case '2':
      if (rooms === 2) {
        newAdvrtsArray.push(advertisementsElement);
      }
      break;
    case '3':
      if (rooms === 3) {
        newAdvrtsArray.push(advertisementsElement);
      }
      break;
    default:
      break;
  }

}

// Сортировка по количеству гостей
const sortByGuests = (advertisementsElement, newAdvrtsArray, value) => {
  const guests = advertisementsElement.offer.guests;
  switch (value) {
    case '1':
      if (guests === 1) {
        newAdvrtsArray.push(advertisementsElement);
      }
      break;
    case '2':
      if (guests === 2) {
        newAdvrtsArray.push(advertisementsElement);
      }
      break;
    case '0':
      if (guests === 0) {
        newAdvrtsArray.push(advertisementsElement);
      }
      break;
    default:
      break;
  }

}


const createSimilarAdvertisements = (similarAdvertisements,value='any') => {
  const filteredAdvertisements = [];  
  const popups = [];
  const similarListFragment = document.createDocumentFragment();
  similarAdvertisements
    .slice()
    .sort((advertisementsElement) => {
      sortByType(advertisementsElement, filteredAdvertisements, value)
    })
    .sort((advertisementsElement) => {
      sortByPrice(advertisementsElement, filteredAdvertisements, value)
    })
    .sort((advertisementsElement) => {
      sortByRooms(advertisementsElement, filteredAdvertisements, value)
    })
    .sort((advertisementsElement) => {
      sortByGuests(advertisementsElement, filteredAdvertisements, value);
    })



  console.log(filteredAdvertisements)

  filteredAdvertisements.forEach(({
    author,
    offer,
  }) => {
    const advertisement = cardTemplate.cloneNode(true).content;
    advertisement.querySelector('.popup__title').textContent = offer.title;
    advertisement.querySelector('.popup__text--address').textContent =
      offer.addres;
    advertisement.querySelector('.popup__text--price').textContent = offer.price;

    const TYPE_NAMES = {
      'flat': 'Квартира',
      'bungalow': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец',
    };

    Object.keys(TYPE_NAMES).forEach((value) => {
      if (offer.type === value) {
        advertisement.querySelector('.popup__type').textContent = TYPE_NAMES[`${value}`];
      }
    });

    advertisement.querySelector('.popup__text--capacity').textContent =
      offer.rooms + ' комнаты для ' + offer.guests + ' гостей';

    advertisement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    const popupFeatures = advertisement.querySelector('.popup__features');

    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }

    const createElementInList = (nameChild, nameParent) => {
      const element = document.createElement('li');
      element.classList.add('.popup__feature');
      element.classList.add('.popup__feature--' + nameChild);
      element.textContent = nameChild;
      nameParent.appendChild(element);
      return element;
    };

    offer.features.forEach(value => {
      createElementInList(value, popupFeatures);
    });

    advertisement.querySelector('.popup__description').textContent =
      offer.description;
    advertisement.querySelector('.popup__photos').textContent = offer.photos;
    advertisement.querySelector('.popup__avatar').textContent = author.avatar;
    similarListFragment.appendChild(advertisement);
  });

  for (let i = 0; i < similarListFragment.children.length; i++) {
    popups[i] = similarListFragment.children[i];
  }
 

  removeMarkers()
  renderAdvertisementsOnMap(filteredAdvertisements,popups);
};

export {
  createSimilarAdvertisements
}
