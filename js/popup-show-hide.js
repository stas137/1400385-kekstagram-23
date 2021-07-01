import {isEscEvent} from './utils.js';
const LEVEL_VALUE = 100;
const EFFECTS_LIST = {
  'effect-none': 'effects__preview--none',
  'effect-chrome': 'effects__preview--chrome',
  'effect-sepia': 'effects__preview--sepia',
  'effect-marvin': 'effects__preview--marvin',
  'effect-phobos': 'effects__preview--phobos',
  'effect-heat': 'effects__preview--heat',
};

const popupShowHide = () => {
  const bodyElement = document.querySelector('body');
  const uploadFile = bodyElement.querySelector('#upload-file');
  const uploadCancel = bodyElement.querySelector('#upload-cancel');
  const formElement = bodyElement.querySelector('.img-upload__overlay');
  const textHashtags = bodyElement.querySelector('.text__hashtags');
  const textDescription = bodyElement.querySelector('.text__description');
  const uploadPreview = bodyElement.querySelector('.img-upload__preview');
  const effectsList = bodyElement.querySelector('.effects__list');
  const effectsItem = effectsList.children;
  const uploadEffectLevel = bodyElement.querySelector('.img-upload__effect-level');
  const effectLevelValue = bodyElement.querySelector('.effect-level__value');

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

  const eventHandler = () => {
    effectLevelValue.value = String(LEVEL_VALUE);
    uploadPreview.style.filter = '';

    if (!uploadEffectLevel.classList.contains('hidden')) {
      uploadEffectLevel.classList.add('hidden');
    }

    for (const value of Object.values(EFFECTS_LIST)) {
      uploadPreview.classList.remove(value);
    }

    uploadPreview.classList.add(EFFECTS_LIST[effectsItem[0].children[0].id]);

    formElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    uploadCancel.addEventListener('click', popupClose);
    document.addEventListener('keydown', onEscKeyDown);
  };

  uploadFile.addEventListener('change', eventHandler);
};

export {popupShowHide};
