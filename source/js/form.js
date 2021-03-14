import {
  sendData
} from './api.js';

import {
  mainPinMarker,
  renderAdvertisements
} from './main.js';

const TypePrices = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
}

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;

const filtersMap = document.querySelector('.map__filters');
const mapFeautures = filtersMap.querySelector('.map__features');
const mapFilters = filtersMap.querySelectorAll('.map__filter');
const housingType = filtersMap.querySelector('#housing-type');
const housingPrice = filtersMap.querySelector('#housing-price');
const housingRooms = filtersMap.querySelector('#housing-rooms');
const housingGuests = filtersMap.querySelector('#housing-guests');
const mapCheckboxes = document.querySelectorAll('.map__checkbox');
const informForm = document.querySelector('.ad-form');
const title = document.querySelector('#title');
const address = document.querySelector('#address');
const price = document.querySelector('#price');
const type = document.querySelector('#type');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const featureCheckboxes = document.querySelectorAll('.feature__checkbox')
const informFieldsets = informForm.querySelectorAll('fieldset');
const description = document.querySelector('#description');
const resetButton = document.querySelector('.ad-form__reset');
const formPhoto = document.querySelector('.ad-form__photo')
const picPreview = document.querySelector('.ad-form-header__pic-preview');

const deactivateForm = () => {
  informForm.classList.add('ad-form--disabled');
  for (let i = 0; i < informFieldsets.length; i++) {
    informFieldsets[i].disabled = true;
  }

  filtersMap.classList.add('ad-form--disabled');
  mapFeautures.disabled = true;
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = true;
  }
}

const activateForm = () => {
  informForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < informFieldsets.length; i++) {
    informFieldsets[i].disabled = false;
  }
}

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
    cb(housingType.value,housingPrice.value,housingRooms.value,housingGuests.value,checkFeatures());
  })

}

// validation

address.setAttribute('readonly', true);
address.value = '35.68170' + ', ' + '139.75388';

let minPrice = 5000;

const onTypeChange = function () {
  minPrice = TypePrices[this.value];
  price.min = minPrice;
  price.placeholder = TypePrices[this.value];
};

type.addEventListener('change', onTypeChange);

const onTimeChange = function (changeOut) {
  return function () {
    changeOut.value = this.value;
  };
};

timein.addEventListener('change', onTimeChange(timeout));
timeout.addEventListener('change', onTimeChange(timein));

title.addEventListener('invalid', () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else {
    title.setCustomValidity('');
  }
});

title.addEventListener('input', () => {
  const valueLength = title.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    title.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

price.addEventListener('invalid', () => {
  switch (true) {
    case price.validity.valueMissing:
      price.setCustomValidity('Обязательное поле');
      break;
    case price.validity.rangeOverflow:
      price.setCustomValidity('Цена не может превышать ' + MAX_PRICE);
      break;
    case price.validity.rangeUnderflow:
      price.setCustomValidity('Цена не может быть ниже ' + minPrice);
      break;
    default:
      price.setCustomValidity('');
      break;
  }
});

price.addEventListener('input', () => {
  const value = price.value;
  if (value < minPrice) {
    price.setCustomValidity('Цена не может быть ниже ' + minPrice);
  } else if (value >=  MAX_PRICE) {
    price.setCustomValidity('Цена не может превышать ' + MAX_PRICE);
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
});

const onRoomNumberChange = function(){
  if (capacity.value === '0' && roomNumber.value !== '100') {
    capacity.setCustomValidity('Выбранное количество гостей может расположиться лишь в 100 комнатах')
  } else if (capacity.value === '1' && roomNumber.value === '100') {
    capacity.setCustomValidity('Выбранное количество гостей может расположиться лишь в 1, 2 или 3 комнате')
  } else if (capacity.value === '2' && (roomNumber.value === '1' || roomNumber.value === '100')) {
    capacity.setCustomValidity('Выбранное количество гостей может расположиться лишь в 2 или 3 комнатах')
  } else if (capacity.value === '3' && roomNumber.value !== '3') {
    capacity.setCustomValidity('Выбранное количество гостей может расположиться лишь в 3 комнатах')
  } else {
    capacity.setCustomValidity('')
  }
  capacity.reportValidity();
};

capacity.addEventListener('change', onRoomNumberChange);

const resetForm = () => {
  housingType.value = 'any';
  housingPrice.value = 'any';
  housingRooms.value = 'any';
  housingGuests.value = 'any';
  title.value = '';
  address.value = '35.68170' + ', ' + '139.75388';
  type.value = 'flat';
  price.value = '';
  timein.value = '12:00';
  timeout.value = '12:00';
  roomNumber.value = '1';
  capacity.value = '1';
  description.value = '';
  formPhoto.style = '';
  picPreview.src = 'img/muffin-grey.svg';

  for (let i = 0; i < featureCheckboxes.length; i++) {
    featureCheckboxes[i].checked = false;
    mapCheckboxes[i].checked = false;
  }

  mainPinMarker.setLatLng({
    lat: 35.68170,
    lng: 139.75388,
  });

  renderAdvertisements();
}

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetForm();
}

resetButton.addEventListener('click', onResetButtonClick);


const setFormSubmit = () => {
  informForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(informForm);
    sendData(resetForm, formData)
  });
}

export {
  address,
  deactivateForm,
  activateForm,
  activateFilters,
  getFiltersValues,
  setFormSubmit
}