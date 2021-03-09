import {renderAdvertisementsOnMap,removeMarkers} from './main.js'

const cardTemplate = document.querySelector('#card');

// Сортировка по типу жилья
const sortByType = (advertisementsElement, value) => {
  if (advertisementsElement.offer.type === value || value === 'any'){
    return true;
  }

}

// Сортировка по цене
const sortByPrice = (advertisementsElement, value) => {
  const price = advertisementsElement.offer.price;
  switch (value) {
    case 'any':
      return true;
    case 'middle':
      if (price >= 10000 && price < 50000) {
        return true;
      }
      break;
    case 'low':
      if (price <= 10000) {
        return true;
      }
      break;
    case 'high':
      if (price >= 50000) {
        return true;
      }
      break;
    default:
      return true;
  }
}

// Сортировка по числу комнат
const sortByRooms = (advertisementsElement, value) => {
  const rooms = advertisementsElement.offer.rooms;
  switch (value) {
    case 'any':
      return true;
    case '1':
      if (rooms === 1) {
        return true;
      }
      break;
    case '2':
      if (rooms === 2) {
        return true;
      }
      break;
    case '3':
      if (rooms === 3) {
        return true;
      }
      break;
    default:
      return true;
  }
}

// Сортировка по количеству гостей
const sortByGuests = (advertisementsElement, value) => {
  const guests = advertisementsElement.offer.guests;
  switch (value) {
    case 'any':
      return true;
    case '1':
      if (guests === 1) {
        return true;
      }
      break;
    case '2':
      if (guests === 2) {
        return true;
      }
      break;
    case '0':
      if (guests === 0) {
        return true;
      }
      break;
    default:
      return false;
  }
}

// Сортировка по доп удобствам
const sortByFeatures = (advertisementsElement, valuesFeature) => {
  const features = advertisementsElement.offer.features;

  if (valuesFeature.length === 0) {
    return true;
  } else {
    let accumulator = 0;

    for (let i = 0; i < valuesFeature.length; i++) {
      for (let j = 0; j < features.length; j++) {        
        if (features[j]===valuesFeature[i]) {
          accumulator++;
        }      
      } 
    }
    
    if (accumulator===valuesFeature.length) {
      return true;
    }
  }

}

const createSimilarAdvertisements = (similarAdvertisements,valueType='any',valuePrice='any',valueRooms='any',valueGuests='any',valuesFeature=[]) => {
  const filteredAdvertisements = [];  
  const popups = [];
  const similarListFragment = document.createDocumentFragment();
  similarAdvertisements
    .slice()
    .filter((advertisementsElement) => {
      if (sortByType(advertisementsElement, valueType) 
      &&  sortByPrice(advertisementsElement, valuePrice) 
      && sortByRooms(advertisementsElement, valueRooms)
      && sortByGuests(advertisementsElement, valueGuests)
      && sortByFeatures(advertisementsElement,valuesFeature)) {
        filteredAdvertisements.push(advertisementsElement);
      }
    })
  // Сортировка по доп удобствам
  

  // console.log(filteredAdvertisements)

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
