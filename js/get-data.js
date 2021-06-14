const ESCAPE_CODE = 'Escape';

const getData = () => {
  const uploadFile = document.querySelector('#upload-file');
  const uploadCancel = document.querySelector('#upload-cancel');
  const formElement = document.querySelector('.img-upload__overlay');
  const bodyElement = document.querySelector('body');

  uploadFile.addEventListener('focus', () => {
    uploadFile.value = '';
  });

  uploadFile.addEventListener('change', () => {
    const effectsList = document.querySelector('.effects__list');
    const effectsItem = effectsList.children;
    effectsItem[0].click();

    formElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
  });

  uploadCancel.addEventListener('click', () => {
    formElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    const textHashtags = document.querySelector('.text__hashtags');
    const textDescription = document.querySelector('.text__description');
    if ((evt.code === ESCAPE_CODE) && (document.activeElement !== textDescription) && (document.activeElement !== textHashtags)) {
      formElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
    }
  });
};

export {getData};
