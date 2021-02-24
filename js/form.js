const form = document.querySelector('.map__filters');
const housingType = form.querySelector('#housing-type');
const price = document.querySelector('#price');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

const TYPE_PRICES = {
  'flat': 1000,
  'bungalow': 0,
  'house': 5000,
  'palace': 10000,
}

const onHousingTypeClick = function () {
  price.min =  TYPE_PRICES[`${this.value}`];
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