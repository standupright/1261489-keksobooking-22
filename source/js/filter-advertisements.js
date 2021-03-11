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
      return true;
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

export {filterAdvertisements}