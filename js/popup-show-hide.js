import {isEscEvent} from './utils.js';

const popupShowHide = () => {
  const bodyElement = document.querySelector('body');
  const uploadFile = bodyElement.querySelector('#upload-file');
  const uploadCancel = bodyElement.querySelector('#upload-cancel');
  const formElement = bodyElement.querySelector('.img-upload__overlay');
  const textHashtags = bodyElement.querySelector('.text__hashtags');
  const textDescription = bodyElement.querySelector('.text__description');

  uploadFile.addEventListener('focus', () => {
    uploadFile.value = '';
  });

  const popupClose = () => {
    formElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    uploadCancel.removeEventListener('click', popupClose);
  };

  const onEscKeyDown = (evt) => {
    if (isEscEvent(evt.code) && (document.activeElement !== textDescription) && (document.activeElement !== textHashtags)) {
      evt.preventDefault();
      popupClose();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  uploadFile.addEventListener('change', () => {
    const effectsList = bodyElement.querySelector('.effects__list');
    const effectsItem = effectsList.children;
    effectsItem[0].click();

    formElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    uploadCancel.addEventListener('click', popupClose);
    document.addEventListener('keydown', onEscKeyDown);
  });
};

export {popupShowHide};
