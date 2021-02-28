import {showAlertSuccess,showAlertError} from './util.js'

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((similarAdvertisements) => {
      onSuccess(similarAdvertisements);
    })
    .then((fragment)=>{return fragment})
};

const sendData = (onSuccess, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        showAlertSuccess();
        onSuccess();
      } else {
        showAlertError();
      }
    })
    .catch(() => {
      showAlertError();
    })
};

export {
  getData,
  sendData
}
