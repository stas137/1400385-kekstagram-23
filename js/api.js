const getData = (onSuccess, onError) => fetch('https://23.javascript.pages.academy/kekstagram/data', {
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
  fetch('https://23.javascript.pages.academy/kekstagram', {
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
