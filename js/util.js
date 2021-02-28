const alertSuccessTemplate = document.querySelector('#success');
const alertErrorTemplate = document.querySelector('#error');

const getRandomCords = (min, max, floatingPoint) => {
  if (min < 0 || max < 0) {
    return 0;
  }

  if (floatingPoint < 0 || floatingPoint > 20) {
    floatingPoint = 0;
  }
  if (min >= max) {
    return (Math.random () * (min - max) + max).toFixed (floatingPoint);
  }

  return (Math.random () * (max - min) + min).toFixed (floatingPoint);
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const ALERT_SHOW_TIME = 5000;

const showAlertSuccess = () => {
  const alertSuccess = alertSuccessTemplate.cloneNode(true).content;
  document.body.append(alertSuccess);

  setTimeout(()=>{
    alertSuccess.remove()
  }, ALERT_SHOW_TIME);
}

const showAlertError = (message) => {
  const alertEror= alertErrorTemplate.cloneNode(true).content;
  document.body.append(alertEror);

  setTimeout(()=>{
    alertEror.remove()
  }, ALERT_SHOW_TIME);
}

export {getRandomCords, showAlertSuccess,showAlertError,isEscEvent};
