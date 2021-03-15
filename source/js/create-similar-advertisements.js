import {
  renderAdvertisementsOnMap,
  removeMarkers
} from './main.js'

import {
  filterAdvertisements
} from './filter-advertisements.js';

const SIMILAR_ADVERTISEMENTS_QUANTITY = 10;

const cardTemplate = document.querySelector('#card');

const createSimilarAdvertisements = (
  similarAdvertisements,
  valueType = 'any',
  valuePrice = 'any',
  valueRooms = 'any',
  valueGuests = 'any',
  valuesFeature = []) => {
  const popups = [];
  const similarListFragment = document.createDocumentFragment();

  const filteredAdvertisements = filterAdvertisements(
    similarAdvertisements,
    valueType,
    valuePrice,
    valueRooms,
    valueGuests,
    valuesFeature).slice(0, SIMILAR_ADVERTISEMENTS_QUANTITY)

  //Заполнение обьявлений по шаблону
  filteredAdvertisements.forEach((
    {
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

    completeTextContentInPopup(title, offer.title);
    completeTextContentInPopup(price, offer.price);
    completeTextContentInPopup(address, offer.address);
    completeTextContentInPopup(description, offer.description);

    author.avatar === '' ? avatar.classList.add('visually-hidden') : avatar.src = author.avatar;

    const TypeNames = {
      flat: 'Квартира',
      bungalow: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец',
    };

    offer.type === '' ? type.classList.add('visually-hidden') : type.textContent = TypeNames[offer.type];

    if (offer.rooms === undefined || offer.guests === undefined) {
      capacity.classList.add('visually-hidden');
    } else {
      capacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    }

    textTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

    features.innerHTML = '';

    const createElementInList = (nameChild, nameParent) => {
      const element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add('popup__feature--' + nameChild);
      element.textContent = nameChild;
      nameParent.appendChild(element);
      return element;
    };

    if (offer.features.length) {
      offer.features.forEach(value => {
        createElementInList(value, features);
      })} else {
      features.classList.add('visually-hidden');
    }

    photos.innerHTML= '';

    const createImg = (nameParent) => {
      const element = document.createElement('img');
      element.classList.add('popup__photo');
      element.width = '45';
      element.height = '40';
      nameParent.appendChild(element);
      return element;
    }

    if (offer.photos.length) {
      offer.photos.forEach((value,index) => {
        createImg(photos);
        if (photos.children[index]){
          photos.children[index].src = value;
        }
      })} else {
      photos.classList.add('visually-hidden');
    }

    similarListFragment.appendChild(advertisement);
  });

  for (let i = 0; i < similarListFragment.children.length; i++) {
    popups[i] = similarListFragment.children[i];
  }

  // Удаление предыдущих меток
  removeMarkers()

  // Отрисовка
  renderAdvertisementsOnMap(filteredAdvertisements, popups);
};

export {
  createSimilarAdvertisements
}
