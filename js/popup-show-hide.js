const ESCAPE_CODE = 'Escape';
const ESC_CODE = 'Esc';

const popupShowHide = () => {
  const bodyElement = document.querySelector('body');
  const uploadFile = bodyElement.querySelector('#upload-file');
  const uploadCancel = bodyElement.querySelector('#upload-cancel');
  const formElement = bodyElement.querySelector('.img-upload__overlay');

  uploadFile.addEventListener('focus', () => {
    uploadFile.value = '';
  });

  uploadFile.addEventListener('change', () => {
    const effectsList = bodyElement.querySelector('.effects__list');
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
    const textHashtags = bodyElement.querySelector('.text__hashtags');
    const textDescription = bodyElement.querySelector('.text__description');
    if (((evt.code === ESCAPE_CODE) || (evt.code === ESC_CODE)) && (document.activeElement !== textDescription) && (document.activeElement !== textHashtags)) {
      formElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
    }
  });
};

export {popupShowHide};
