const STEP = 25;

const EFFECTS_LIST = {
  'effect-none': 'effects__preview--none',
  'effect-chrome': 'effects__preview--chrome',
  'effect-sepia': 'effects__preview--sepia',
  'effect-marvin': 'effects__preview--marvin',
  'effect-phobos': 'effects__preview--phobos',
  'effect-heat': 'effects__preview--heat',
};
const uploadImg = document.querySelector('.img-upload');
const uploadPreview = uploadImg.querySelector('.img-upload__preview');

const editScale = () => {
  const controlSmaller = uploadImg.querySelector('.scale__control--smaller');
  const controlBigger = uploadImg.querySelector('.scale__control--bigger');
  const controlValue = uploadImg.querySelector('.scale__control--value');

  controlSmaller.addEventListener('click', () => {
    const number = parseInt(controlValue.value.slice(0, controlValue.value.length - 1), 10);
    if ((number - STEP) > STEP) {
      controlValue.value = `${number - STEP}%`;
      uploadPreview.style.transform = `scale(${(number - STEP) / 100})`;
    }
  });

  controlBigger.addEventListener('click', () => {
    const number = parseInt(controlValue.value.slice(0, controlValue.value.length - 1), 10);
    if ((number + STEP) <= 100) {
      controlValue.value = `${number + STEP}%`;
      uploadPreview.style.transform = `scale(${(number + STEP) / 100})`;
    }
  });
};

const effectsRadioAddEventHandler = (item) => {
  const radioAddEventHandler = () => {
    const effectsItemChildren = item.children;
    const uploadEffectLevel = uploadImg.querySelector('.img-upload__effect-level');
    const effectLevelValue = uploadEffectLevel.querySelector('.effect-level__value');
    effectLevelValue.value = '100';

    if (effectsItemChildren[0].id === 'effect-none') {
      uploadEffectLevel.classList.add('hidden');
      uploadPreview.style.filter = '';
    } else {
      uploadEffectLevel.classList.remove('hidden');
    }

    if (uploadPreview.classList.contains(EFFECTS_LIST[effectsItemChildren[0].id])) {
      return;
    }

    for (const value of Object.values(EFFECTS_LIST)) {
      uploadPreview.classList.remove(value);
    }

    uploadPreview.classList.add(EFFECTS_LIST[effectsItemChildren[0].id]);
  };

  item.addEventListener('click', radioAddEventHandler);
};

const editEffects = () => {
  const effectsList = document.querySelector('.effects__list');
  const effectsItem = effectsList.children;

  for (let index = 0; index < effectsItem.length; index++){
    effectsRadioAddEventHandler(effectsItem[index]);
  }
};

const editHashtags = () => {
  const textHashtags = document.querySelector('.text__hashtags');
  const textDescription = document.querySelector('.text__description');

  textHashtags.addEventListener('input', () => {
    if (textHashtags.validationMessage !== '') {
      textHashtags.setCustomValidity('');
      textHashtags.style.outlineColor = 'black';
    }
  });

  textDescription.addEventListener('input', () => {
    if (textDescription.validationMessage !== '') {
      textDescription.setCustomValidity('');
      textDescription.style.outlineColor = 'black';
    }
  });
};

export {editScale, editEffects, editHashtags};
