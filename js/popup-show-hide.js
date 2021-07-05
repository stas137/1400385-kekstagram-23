import {isEscEvent} from './utils.js';
const MAX_SCALE_VALUE = 100;
const LEVEL_VALUE = 100;
const EFFECT_NONE = 'effect-none';
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
  const uploadEffectLevel = bodyElement.querySelector('.img-upload__effect-level');
  const effectLevelValue = uploadEffectLevel.querySelector('.effect-level__value');
  const effectsList = bodyElement.querySelector('.effects__list');
  const effectsItem = effectsList.children;
  const uploadScale = bodyElement.querySelector('.img-upload__scale');
  const controlValue = uploadScale.querySelector('.scale__control--value');

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

  const setEffect = (level, item) => {
    effectLevelValue.value = level;

    if (item[0].id === EFFECT_NONE) {
      uploadEffectLevel.classList.add('hidden');
      uploadPreview.style.filter = '';
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }

    if (uploadPreview.classList.contains(EFFECTS_LIST[item[0].id])) {
      return;
    }

    for (const value of Object.values(EFFECTS_LIST)) {
      uploadPreview.classList.remove(value);
    }

    uploadPreview.classList.add(EFFECTS_LIST[item[0].id]);
  };

  const effectsRadioAddEventHandler = (item) => {
    const radioEventHandler = () => {
      setEffect(String(LEVEL_VALUE), item.children);
    };
    item.addEventListener('click', radioEventHandler);
  };

  const editEffects = () => {
    for (let index = 0; index < effectsItem.length; index++) {
      effectsRadioAddEventHandler(effectsItem[index]);
    }
  };

  const uploadImg = (file) => {
    const imgFile = file;
    const readerFile = new FileReader();

    readerFile.readAsDataURL(imgFile);

    readerFile.onload = () => {
      uploadPreview.children[0].src = readerFile.result;
      uploadPreview.style.transform = `scale(${controlValue.value.slice(0, controlValue.value.length - 1) / MAX_SCALE_VALUE})`;
    };
  };

  const uploadEventHandler = () => {
    setEffect(String(LEVEL_VALUE), effectsItem[0].children);
    editEffects();
    uploadImg(uploadFile.files[0]);

    formElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    uploadCancel.addEventListener('click', popupClose);
    document.addEventListener('keydown', onEscKeyDown);
  };

  uploadFile.addEventListener('change', uploadEventHandler);
};

export {popupShowHide};
