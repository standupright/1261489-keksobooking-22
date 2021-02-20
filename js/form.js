const form = document.querySelector ('.map__filters');
const housingType = form.querySelector ('#housing-type');
const price = document.querySelector ('#price');
const timein = document.querySelector ('#timein');
const timeout = document.querySelector ('#timeout');

const onHousingTypeClick = function () {
  switch (this.value) {
    case 'palace':
      price.min = 10000;
      price.placeholder = 10000;
      break;
    case 'flat':
      price.min = 1000;
      price.placeholder = 1000;
      break;
    case 'house':
      price.min = 5000;
      price.placeholder = 5000;
      break;
    case 'bungalow':
      price.min = 0;
      price.placeholder = 0;
      break;
    default:
      break;
  }
};

housingType.addEventListener ('change', onHousingTypeClick);

const onTimeClick = function (changeOut) {
  return function () {
    switch (this.value) {
      case '12:00':
        changeOut.value = '12:00';
        break;
      case '13:00':
        changeOut.value = '13:00';
        break;
      case '14:00':
        changeOut.value = '14:00';
        break;
      default:
        break;
    }
  };
};

timein.addEventListener ('change', onTimeClick (timeout));
timeout.addEventListener ('change', onTimeClick (timein));