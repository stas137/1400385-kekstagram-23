import {isEscEvent} from './utils.js';
import {checkData} from './check-data.js';
import {sendData} from './api.js';

const ALERT_SHOW_TIME = 4000;
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

const bodyElement = document.querySelector('body');
const uploadFile = bodyElement.querySelector('#upload-file');
const uploadCancel = bodyElement.querySelector('#upload-cancel');
const imgUploadForm = bodyElement.querySelector('.img-upload__form');
const formElement = bodyElement.querySelector('.img-upload__overlay');
const formSubmit = bodyElement.querySelector('.img-upload__submit');
const textHashtags = bodyElement.querySelector('.text__hashtags');
const textDescription = bodyElement.querySelector('.text__description');
const uploadPreview = bodyElement.querySelector('.img-upload__preview');
const uploadEffectLevel = bodyElement.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadEffectLevel.querySelector('.effect-level__slider');
const effectLevelValue = uploadEffectLevel.querySelector('.effect-level__value');
const effectsList = bodyElement.querySelector('.effects__list');
const effectsItem = effectsList.children;
const uploadScale = bodyElement.querySelector('.img-upload__scale');
const controlValue = uploadScale.querySelector('.scale__control--value');

const popupClose = () => {
  formElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  uploadFile.value = '';
  textHashtags.value = '';
  textDescription.value = '';

  effectLevelSlider.noUiSlider.destroy();
  uploadCancel.removeEventListener('click', popupClose);
};

const onEscKeyDown = (evt) => {
  if (isEscEvent(evt.code) && (document.activeElement !== textDescription) && (document.activeElement !== textHashtags)) {
    evt.preventDefault();
    popupClose();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const popupShowHide = () => {

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

    const effectLevelSliderUpdate = (min = 0, max = LEVEL_VALUE, start = LEVEL_VALUE, step = 1, fixed = 0) => {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        start: start,
        step: step,
        connect: 'lower',
        format: {
          to(value) {
            return value.toFixed(fixed);
          },
          from(value) {
            return parseFloat(value);
          },
        },
      });
    };

    if (uploadPreview.classList.contains('effects__preview--chrome') || uploadPreview.classList.contains('effects__preview--sepia')) {
      effectLevelSliderUpdate(0, 1, 1, 0.1, 1);
    }  else if (uploadPreview.classList.contains('effects__preview--marvin')) {
      effectLevelSliderUpdate();
    } else if (uploadPreview.classList.contains('effects__preview--phobos') || uploadPreview.classList.contains('effects__preview--heat')) {
      effectLevelSliderUpdate(0, 3, 3, 0.1, 1);
    }
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
    const FILE_TYPES = ['jpg', 'jpeg', 'png'];
    const imgFile = file;
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((elem) => fileName.endsWith(elem));

    if (matches) {
      const readerFile = new FileReader();
      readerFile.readAsDataURL(imgFile);

      readerFile.onload = () => {
        uploadPreview.children[0].src = readerFile.result;
        uploadPreview.style.transform = `scale(${controlValue.value.slice(0, controlValue.value.length - 1) / MAX_SCALE_VALUE})`;
      };
    }
  };

  const uploadEventHandler = () => {
    setEffect(String(LEVEL_VALUE), effectsItem[0].children);
    editEffects();
    uploadImg(uploadFile.files[0]);

    formElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    noUiSlider.create(effectLevelSlider, {
      range: {
        min: 0,
        max: LEVEL_VALUE,
      },
      start: LEVEL_VALUE,
      step: 1,
      connect: 'lower',
      format: {
        to(value) {
          return value.toFixed(0);
        },
        from(value) {
          return parseFloat(value);
        },
      },
    });

    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];

      if (uploadPreview.classList.contains('effects__preview--chrome')) {
        uploadPreview.style.filter = `grayscale(${(values[handle])})`;
      } else if (uploadPreview.classList.contains('effects__preview--sepia')) {
        uploadPreview.style.filter = `sepia(${(values[handle])})`;
      } else if (uploadPreview.classList.contains('effects__preview--marvin')) {
        uploadPreview.style.filter = `invert(${(values[handle])}%)`;
      } else if (uploadPreview.classList.contains('effects__preview--phobos')) {
        uploadPreview.style.filter = `blur(${(values[handle])}px)`;
      } else if (uploadPreview.classList.contains('effects__preview--heat')) {
        uploadPreview.style.filter = `brightness(${(values[handle])})`;
      }
    });

    uploadCancel.addEventListener('click', popupClose);
    document.addEventListener('keydown', onEscKeyDown);
  };

  uploadFile.addEventListener('change', uploadEventHandler);
};

const renderSuccess = (err) => {
  const errorContainerTemplate = bodyElement.querySelector('#error').content;
  const errorContainerContains = errorContainerTemplate.querySelector('.error');
  const errorContainer = errorContainerContains.cloneNode(true);
  const errorTitle = errorContainer.querySelector('.error__title');
  errorTitle.textContent = err;

  bodyElement.append(errorContainer);
  setTimeout(() => { errorContainer.remove(); }, ALERT_SHOW_TIME);
};

const renderError = (err) => {
  const errorContainerTemplate = bodyElement.querySelector('#error').content;
  const errorContainerContains = errorContainerTemplate.querySelector('.error');
  const errorContainer = errorContainerContains.cloneNode(true);
  const errorTitle = errorContainer.querySelector('.error__title');
  errorTitle.textContent = err;

  bodyElement.append(errorContainer);
  setTimeout(() => { errorContainer.remove(); }, ALERT_SHOW_TIME);
};

formSubmit.addEventListener('click', (evt) => {
  if (checkData()) {
    evt.preventDefault();
    const formData = new FormData(imgUploadForm);
    sendData(renderSuccess, renderError, formData);
  }
});

export {popupShowHide};
