const filtersMap = document.querySelector('.map__filters');
const mapFeautures = filtersMap.querySelector('.map__features');
const mapFilters = filtersMap.querySelectorAll('.map__filter');
const housingType = filtersMap.querySelector('#housing-type');
const housingPrice = filtersMap.querySelector('#housing-price');
const housingRooms = filtersMap.querySelector('#housing-rooms');
const housingGuests = filtersMap.querySelector('#housing-guests');
const mapCheckboxes = document.querySelectorAll('.map__checkbox');

// Deactivate filters
const deactivateFilters = () => {filtersMap.classList.add('ad-form--disabled');
  mapFeautures.disabled = true;
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = true;
  }
}

// Activate filters
const activateFilters = () => {
  filtersMap.classList.remove('ad-form--disabled');
  mapFeautures.disabled = false;
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = false;
  }
}

// Функция передает в коллбэк все values фильтров для карты
const getFiltersValues= (cb) => {
  const checkFeatures = () => {
    let featuresValues = [];
    for (let i = 0; i < mapCheckboxes.length; i++) {
      if (mapCheckboxes[i].checked) {
        featuresValues.push(mapCheckboxes[i].value)
      }
    }
    return featuresValues;
  }

  filtersMap.addEventListener('change', ()=> {
    cb(housingType.value, housingPrice.value, housingRooms.value, housingGuests.value, checkFeatures());
  })
}

// reset filters
const resetFilters = () => {
  housingType.value = 'any';
  housingPrice.value = 'any';
  housingRooms.value = 'any';
  housingGuests.value = 'any';

  for (let i = 0; i < mapCheckboxes.length; i++) {
    mapCheckboxes[i].checked = false;
  }
}

// Сортировка по типу жилья
const sortByType = (advertisementsElement, valueType) => {
  return advertisementsElement.offer.type === valueType || valueType === 'any';
}

// Сортировка по цене
const sortByPrice = (advertisementsElement, valuePrice) => {
  const price = advertisementsElement.offer.price;
  switch (valuePrice) {
    case 'any':
      return true;
    case 'middle':
      return price >= 10000 && price < 50000;
    case 'low':
      return price <= 10000;
    case 'high':
      return price >= 50000;
    default:
      return false;
  }
}

// Сортировка по числу комнат
const sortByRooms = (advertisementsElement, valueRooms) => {
  const rooms = advertisementsElement.offer.rooms;
  switch (valueRooms) {
    case 'any':
      return true;
    case '1':
      return rooms === 1;
    case '2':
      return rooms === 2;
    case '3':
      return rooms === 3;
    default:
      return false;
  }
}

// Сортировка по количеству гостей
const sortByGuests = (advertisementsElement, valueGuests) => {
  const guests = advertisementsElement.offer.guests;
  switch (valueGuests) {
    case 'any':
      return true;
    case '0':
      return guests === 0;
    case '1':
      return guests === 1;
    case '2':
      return guests === 2;
    default:
      return false;
  }
}

// Сортировка по доп удобствам
const sortByFeatures = (advertisementsElement, valuesFeature) => {
  const features = advertisementsElement.offer.features;

  if (valuesFeature.length) {
    let accumulator = 0;
    for (let i = 0; i < valuesFeature.length; i++) {
      for (let j = 0; j < features.length; j++) {
        if (features[j] === valuesFeature[i]) {
          accumulator++;
        }
      }
    }
    return accumulator === valuesFeature.length
  }
  return true;
}

const filterAdvertisements = (
  similarAdvertisements,
  valueType = 'any',
  valuePrice = 'any',
  valueRooms = 'any',
  valueGuests = 'any',
  valuesFeature = []) => {
  const filteredAdvertisements = [];

  similarAdvertisements
    .slice()
    .filter(advertisementsElement => {
      if (
        sortByType(advertisementsElement, valueType) &&
        sortByPrice(advertisementsElement, valuePrice) &&
        sortByRooms(advertisementsElement, valueRooms) &&
        sortByGuests(advertisementsElement, valueGuests) &&
        sortByFeatures(advertisementsElement, valuesFeature)
      ) {
        filteredAdvertisements.push(advertisementsElement);
      }
    });

  return filteredAdvertisements;
};

export {
  deactivateFilters,
  activateFilters,
  getFiltersValues,
  resetFilters,
  filterAdvertisements
}
