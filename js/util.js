const alertSuccessTemplate = document.querySelector('#success');
const alertErrorTemplate = document.querySelector('#error');
const main = document.querySelector('main');

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const ALERT_SHOW_TIME = 5000;

const showMessageErrorAlert = (error) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '20px 10px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.width = 200;
  alertContainer.style.height = 200;

  alertContainer.textContent = 'Произошла ошибка при загрузке данных с сервера :( Обновите страницу!';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove()
  }, ALERT_SHOW_TIME);
}

const onAlertKeydown = (container) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeAlert(container);
    }
  }
}

const onWindowsClick = (container) => {
  return (evt) => {
    evt.preventDefault();
    closeAlert(container);
  }
}

const closeAlert = (container) => {
  container.remove();
  document.removeEventListener('keypress', onAlertKeydown(container))
  container.removeEventListener('click', onWindowsClick(container));
}

const showAlertSuccess = () => {
  const alertSuccess = alertSuccessTemplate.cloneNode(true).content;
  const alertContainer = document.createElement('div');
  alertContainer.append(alertSuccess);
  main.append(alertContainer);

  document.addEventListener('keydown', onAlertKeydown(alertContainer));
  alertContainer.addEventListener('click', onWindowsClick(alertContainer));
}

const showAlertError = () => {
  const alertEror = alertErrorTemplate.cloneNode(true).content;
  const alertContainer = document.createElement('div');
  alertContainer.append(alertEror);
  main.append(alertContainer);

  document.addEventListener('keydown', onAlertKeydown(alertContainer));
  alertContainer.addEventListener('click', onWindowsClick(alertContainer));
}

export {
  showMessageErrorAlert,
  showAlertSuccess,
  showAlertError,
  isEscEvent
};
