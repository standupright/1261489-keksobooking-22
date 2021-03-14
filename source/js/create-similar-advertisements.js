import {renderAdvertisementsOnMap,removeMarkers} from './main.js'

const cardTemplate = document.querySelector('#card');

// Сортировка по типу жилья
const sortByType = (advertisementsElement, value) => {
  return advertisementsElement.offer.type === value || value === 'any'
}

// Сортировка по цене
const sortByPrice = (advertisementsElement, value) => {
  const price = advertisementsElement.offer.price;
  switch (value) {
    case 'any':
      return true;
    case 'middle':
      return price >= 10000 && price < 50000;
    case 'low':
      return price <= 10000;
    case 'high':
      return price >= 50000;
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
      return rooms === 1;
    case '2':
      return rooms === 2;
    case '3':
      return rooms === 3;
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
      return guests === 1;
    case '2':
      return guests === 2;
    case '0':
      return guests === 0;
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
    return accumulator === valuesFeature.length
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
      && sortByFeatures(advertisementsElement, valuesFeature)) {
        filteredAdvertisements.push(advertisementsElement);
      }
    })

  filteredAdvertisements.forEach(({
    author,
    offer,
  }) => {
    const advertisement = cardTemplate.cloneNode(true).content;
    const title = advertisement.querySelector('.popup__title');
    const price = advertisement.querySelector('.popup__text--price');
    const address = advertisement.querySelector('.popup__text--address');
    const type = advertisement.querySelector('.popup__type');
    const capacity = advertisement.querySelector('.popup__text--capacity');
    const textTime = advertisement.querySelector('.popup__text--time');
    const features = advertisement.querySelector('.popup__features');
    const description = advertisement.querySelector('.popup__description');
    const photos = advertisement.querySelector('.popup__photos');
    const avatar = advertisement.querySelector('.popup__avatar');

    const completeTextContentInPopup = (popupElement, advertisementElement) => {
      advertisementElement === '' ? popupElement.classList.add('visually-hidden') : popupElement.textContent = advertisementElement;
    }

    completeTextContentInPopup(title,offer.title);
    completeTextContentInPopup(price,offer.price);
    completeTextContentInPopup(address,offer.address);
    completeTextContentInPopup(description,offer.description);

    author.avatar === '' ? avatar.classList.add('visually-hidden') : avatar.src = author.avatar;

    const TYPE_NAMES = {
      'flat': 'Квартира',
      'bungalow': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец',
    };

    const swapTypeName = () => {
      Object.keys(TYPE_NAMES).forEach((value) => {
        if (offer.type === value) {
          type.textContent = TYPE_NAMES[`${value}`];
        }
      });
    }

    offer.type === '' ? avatar.classList.add('visually-hidden') : swapTypeName();

    if (offer.rooms === undefined || offer.guests === undefined) {
      capacity.classList.add('visually-hidden');
    } else {
      capacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    }

    textTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    while (features.firstChild) {
      features.removeChild(features.firstChild);
    }

    const createElementInList = (nameChild, nameParent) => {
      const element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add('popup__feature--' + nameChild);
      element.textContent = nameChild;
      nameParent.appendChild(element);
      return element;
    };

    if (offer.features.length === 0) {
      features.classList.add('visually-hidden');
    } else {
      offer.features.forEach(value => {
        createElementInList(value, features);
      });
    }

    while (photos.firstChild) {
      photos.removeChild(photos.firstChild);
    }

    const createImg = (nameParent) => {
      const element = document.createElement('img');
      element.classList.add('popup__photo');
      element.width = '45';
      element.height = '40';
      nameParent.appendChild(element);
      return element;
    }

    if (offer.photos.length === 0) {
      photos.classList.add('visually-hidden');
    } else {
      offer.photos.forEach((value,index) => {
        createImg(photos);
        if (photos.children[index]){
          photos.children[index].src = value;
        }
      });
    }

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
