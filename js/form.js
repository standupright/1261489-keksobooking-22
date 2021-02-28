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

const onHousingTypeClick = function () {
  price.min = TYPE_PRICES[`${this.value}`];
  price.placeholder = TYPE_PRICES[`${this.value}`];
};

housingType.addEventListener('change', onHousingTypeClick);

const onTimeClick = function (changeOut) {
  return function () {
    changeOut.value = this.value;
  };
};

timein.addEventListener('change', onTimeClick(timeout));
timeout.addEventListener('change', onTimeClick(timein));

export {
  address
}
