import {
  showMessageErrorAlert,
  showAlertSuccess,
  showAlertError
} from './util.js'

const getData = (onSuccess) => {
  try {
    fetch('https://22.javascript.pages.academy/keksobooking/data')
      .then((response) => response.json())
      .then((similarAdvertisements) => {
        onSuccess(similarAdvertisements);
      })
      .catch(() => showMessageErrorAlert());
  } catch (error) {
    showMessageErrorAlert()
  }

};

const sendData = (onSuccess, bodyForm) => {
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body:bodyForm, 
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
