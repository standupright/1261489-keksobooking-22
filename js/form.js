import {
  initiateMap
} from './main.js';

const filtersMap = document.querySelector('.map__filters');
const mapFeautures = filtersMap.querySelector('.map__features');
const mapFilters = filtersMap.querySelectorAll('.map__filter');
const housingType = filtersMap.querySelector('#housing-type');
const price = document.querySelector('#price');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const informForm = document.querySelector('.ad-form');
const informFieldsets = informForm.querySelectorAll('fieldset');
const address = document.querySelector('#address');
const title = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

// Неактивное состояние
informForm.classList.add('ad-form--disabled');
for (let i = 0; i < informFieldsets.length; i++) {
  informFieldsets[i].disabled = true;
}

filtersMap.classList.add('ad-form--disabled');
mapFeautures.disabled = true;
for (let i = 0; i < mapFilters.length; i++) {
  mapFilters[i].disabled = true;
}

// Активное состояние
if (initiateMap) {
  informForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < informFieldsets.length; i++) {
    informFieldsets[i].disabled = false;
  }

  filtersMap.classList.remove('ad-form--disabled');
  mapFeautures.disabled = false;
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].disabled = false;
  }
}

address.setAttribute('readonly', true);
address.value = '35.68170' + ', ' + '139.75388';

const TYPE_PRICES = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
}

const onHousingTypeChange = function () {
  price.min = TYPE_PRICES[`${this.value}`];
  price.placeholder = TYPE_PRICES[`${this.value}`];
};

housingType.addEventListener('change', onHousingTypeChange);

const onTimeChange = function (changeOut) {
  return function () {
    changeOut.value = this.value;
  };
};

timein.addEventListener('change', onTimeChange(timeout));
timeout.addEventListener('change', onTimeChange(timein));

// Валидация

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;

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
    title.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) +' симв.');
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});


price.addEventListener('invalid', () => {
  if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
});

const MAX_PRICE = 1000000;

price.addEventListener('input', () => {
  let value = price.value

  if ( value >= MAX_PRICE) {
    console.log('yes')
    price.setCustomValidity('Цена не может превышать ' + MAX_PRICE);
  } else if ( value === 0)
  {
    price.setCustomValidity('Цена не может равняться 0');
  }
  else {
    console.log('no')
    price.setCustomValidity('');
  }
  price.reportValidity();
});

const onRoomNumberChange = function(){
    if (this.value == 0 && roomNumber.value != 100) {
      this.setCustomValidity('Выбранное количество гостей может расположиться лишь в 100 комнатах')
    } else if (this.value == 1 && roomNumber.value == 100) {
      this.setCustomValidity('Выбранное количество гостей может расположиться лишь в 1, 2 или 3 комнате')
    } else if (this.value == 2 && (roomNumber.value == 1 || roomNumber.value == 100)) {
      this.setCustomValidity('Выбранное количество гостей может расположиться лишь в 2 или 3 комнатах')
    } else if (this.value == 3 && roomNumber.value != 3) {
      this.setCustomValidity('Выбранное количество гостей может расположиться лишь в 3 комнатах')
    } else {
      this.setCustomValidity('')
    }
  this.reportValidity();
};

capacity.addEventListener('change',onRoomNumberChange);

export {
  address
}
