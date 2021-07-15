const URL_GET = 'https://23.javascript.pages.academy/kekstagram/data';
const URL_POST = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => fetch(URL_GET, {
  method: 'GET',
  credentials: 'same-origin',
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => onSuccess(data))
  .catch((err) => onError(err));

const sendData = (onSuccess, onError, formData) => {
  fetch(URL_POST, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error('Ошибка загрузки файла!');
    })
    .catch((err) => onError(err));
};

export {getData, sendData};
