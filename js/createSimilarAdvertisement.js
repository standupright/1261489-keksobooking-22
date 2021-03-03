const cardTemplate = document.querySelector('#card');

const popups = [];

const renderSimilarAdvertisements = (similarAdvertisements) => {
  const similarListFragment = document.createDocumentFragment();
  similarAdvertisements
    .slice()
    .forEach(({
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

  return popups;
};

export {
  renderSimilarAdvertisements,
  popups
}
